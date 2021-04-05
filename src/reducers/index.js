import {combineReducers} from 'redux';

import authReducer from './authenticated.reducer';
import miscReducer from './misc.reducer';

const RootReducer = combineReducers({
  authenticated: authReducer,
  misc: miscReducer,
});

export default RootReducer;
