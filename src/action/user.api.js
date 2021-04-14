import axios from './axios';

import {UPDATE_USER} from './type';
import {BASE_URL} from 'constants/config';
import {HijackError} from 'shared/utils';

export const getUser = () => {
  return (dispatch, getState) => {
    const store = getState();
    const {_id, accessToken} = store?.user;
    return HijackError(
      axios
        .get(`${BASE_URL}user/${_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({data}) => {
          dispatch({type: UPDATE_USER, payload: data});
          return data;
        }),
      dispatch,
      getState,
    );
  };
};

export const updateProfilePic = (state) => (dispatch, getState) => {
  const store = getState();
  const {_id, accessToken} = store?.user;
  return HijackError(
    axios
      .put(`${BASE_URL}user/${_id}`, state, {
        headers: {Authorization: `Bearer ${accessToken}`},
      })
      .then(({data}) => data),
    dispatch,
    getState,
  );
};
