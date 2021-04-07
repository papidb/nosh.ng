import axios from './axios';

import {TOGGLE_BIO} from './type';
import {BASE_URL} from 'constants/config';

export const changePassword = (data) => {
  return () => {
    return axios.post(`${BASE_URL}signup`, data).then((res) => res.data);
  };
};

export const toggleBio = (data) => (dispatch) => dispatch({type: TOGGLE_BIO});
