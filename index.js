/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import logger from 'logger';
import {captureException} from '@sentry/minimal';

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  try {
    logger.sentry('Message handled in the background!', remoteMessage);
  } catch (error) {
    logger.sentry(`error setting backgroundMessagehandler`);
    captureException(error);
  }
});

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
