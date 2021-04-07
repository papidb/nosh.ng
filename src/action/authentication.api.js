import axios, {AxiosResponse} from 'axios';

import {LOGIN, LOGOUT} from './type';

import {BASE_URL} from 'constants/config';

export const logout = () => (dispatch) => dispatch({type: LOGOUT});
export const login = () => (dispatch) => dispatch({type: LOGIN});

// export const login = (data) => {
//   return (dispatch) => {
//     return axios.post(`${BASE_URL}login`, data).then((res) => {
//       dispatch({type: LOGIN, payload: res});
//       return res.data;
//     });
//   };
// };

export const register = (data) => {
  return () => {
    return axios.post(`${BASE_URL}signup`, data).then((res) => res.data);
  };
};

export const forgotPassword = (data) => {
  return () => {
    return axios.put(`${BASE_URL}forgot-password`, data).then((res) => {
      return res.data;
    });
  };
};
