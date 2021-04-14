import Axios from 'axios';
import {LOGOUT, REFRESH_TOKEN} from 'action/type';
import {BASE_URL} from 'constants/config';

export const refreshToken = (getState) => {
  const store = getState();
  const auth = store.auth;
  const accessToken = auth?.accessToken ?? '';
  const refresh = auth?.refreshToken ?? '';

  return Axios.post(
    `${BASE_URL}refresh`,
    {
      refreshToken: refresh,
    },
    {
      headers: {
        Authorization: `BEARER ${accessToken}`,
      },
    },
  );
};

export const HijackError = (cb, dispatch, getState) =>
  cb.catch((error) => {
    console.log(error?.response?.status, error?.response?.data);
    console.log(error.response?.config);
    if (error?.response?.status == 401) {
      dispatch({type: LOGOUT});
      try {
        error.response.data.message = 'Re authenticate';
      } catch (err) {}
      // throw error;
      return refreshToken(getState)
        .then(({data}) => {
          dispatch({type: REFRESH_TOKEN, payload: data});
          console.log('Successfully refereshed token');
          error.config.headers['Authorization'] = `Bearer ${data.accessToken}`;
          return Axios.request(error.config);
        })
        .catch((errorT) => {
          console.log(errorT.response);
          console.log('failed to referesh token');
          dispatch({type: LOGOUT});
          throw errorT;
        });
    }
    throw error;
  });
