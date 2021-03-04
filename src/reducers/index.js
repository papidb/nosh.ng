import {combineReducers} from 'redux';

import authReducer from './authenticated.reducer';

const RootReducer = combineReducers({
  authenticated: authReducer,
});

export default RootReducer;
