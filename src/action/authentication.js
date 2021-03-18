import {LOGIN, LOGOUT} from './type';

export const logout = () => (dispatch) => dispatch({type: LOGOUT});
export const login = () => (dispatch) => dispatch({type: LOGIN});
