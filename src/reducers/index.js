import {combineReducers} from 'redux';

import authReducer from './authenticated.reducer';
import miscReducer from './misc.reducer';
import userReducer from './user.reducer';

const RootReducer = combineReducers({
  authenticated: authReducer,
  user: userReducer,
  misc: miscReducer,
});

export default RootReducer;
