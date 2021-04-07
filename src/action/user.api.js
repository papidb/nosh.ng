import axios from './axios';

import {BASE_URL} from 'constants/config';

export const getUser = () => {
  return (dispatch, getState) => {
    const store = getState();
    const {refreshToken, _id, accessToken} = store?.user;
    return axios
      .get(`${BASE_URL}user/${_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);
  };
};
