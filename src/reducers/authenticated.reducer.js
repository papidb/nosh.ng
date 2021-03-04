import {LOGOUT, LOGIN} from 'action/type';

const INITIAL_STATE = false;

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT:
      return false;
    case LOGIN:
      return true;
    default:
      return state;
  }
}
