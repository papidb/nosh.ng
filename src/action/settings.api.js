import axios from './axios';

import {TOGGLE_BIO} from './type';
import {BASE_URL} from 'constants/config';
import {HijackError} from 'shared/utils';

export const changePassword = (data) => {
  return (dispatch, getState) =>
    HijackError(
      axios.post(`${BASE_URL}signup`, data).then((res) => res.data),
      dispatch,
      getState,
    );
};
export const addBank = (data) => {
  return (dispatch, getState) => {
    const store = getState();
    const {accessToken} = store?.auth;
    const {_id} = store?.user;
    return HijackError(
      axios
        .post(`${BASE_URL}add-bank/${_id}`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({data}) => data),
      dispatch,
      getState,
    );
  };
};

export const withdraw = (data) => {
  return (dispatch, getState) => {
    const store = getState();
    const {accessToken} = store?.auth;
    const {_id} = store?.user;
    return HijackError(
      axios
        .post(`${BASE_URL}withdraw/${_id}`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({data}) => data),
      dispatch,
      getState,
    );
  };
};

export const toggleBio = () => (dispatch) => dispatch({type: TOGGLE_BIO});
