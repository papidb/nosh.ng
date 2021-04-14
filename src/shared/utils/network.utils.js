import {LOGOUT} from 'action/type';
import Axios from 'axios';
import {BASE_URL} from 'constants/config';

export const refreshToken = (getState) => {
  const store = getState();
  const user = store.user;
  const accessToken = user?.accessToken ?? '';
  const refresh = store.user?.refreshToken ?? '';

  return Axios.post(
    `${BASE_URL}/refresh`,
    {
      accessToken,
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
    // console.log(error?.response);
    if (error?.response?.status == 401) {
      return refreshToken(getState)
        .then(() => {
          // try {
          //   cb();
          // } catch (err) {
          //   console.log("Retry Failed");
          //   throw err;
          // }
          console.log('Successfully refereshed token');
        })
        .catch((errorT) => {
          console.log('failed to referesh token');
          dispatch({type: LOGOUT});
          throw errorT;
        })
        .finally(() => {
          return cb();
        });
    }
  });
