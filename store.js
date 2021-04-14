import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from './src/reducers';

const whitelist = __DEV__ ? ['user', 'misc', 'auth'] : ['user', 'misc'];

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    whitelist: whitelist,
    stateReconciler: autoMergeLevel2,
  },
  rootReducer,
);

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const configureStore = () => {
  const enhancer = composeEnhancers(applyMiddleware(thunk));
  return {
    ...createStore(persistedReducer, enhancer),
  };
};

export default () => {
  let store = configureStore();
  let persistor = persistStore(store);
  return {store, persistor};
};
