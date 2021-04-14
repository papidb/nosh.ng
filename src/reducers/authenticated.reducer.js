import {LOGOUT, LOGIN, REFRESH_TOKEN} from 'action/type';

const INITIAL_STATE = {
  authenticated: false,
  accessToken: '',
  refreshToken: '',
};

export default function authReducer(state = INITIAL_STATE, action) {
  const payload = action.payload;
  switch (action.type) {
    case LOGOUT:
      return INITIAL_STATE;
    case LOGIN:
      const {user} = payload;
      const accessToken = user?.accessToken;
      const refreshToken = user?.refreshToken;
      return {
        ...state,
        accessToken,
        refreshToken,
        authenticated: true,
      };

    case REFRESH_TOKEN:
      return {
        ...state,
        payload,
      };
    default:
      return state;
  }
}
