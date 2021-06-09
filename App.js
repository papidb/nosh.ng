/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {StatusBar, LogBox, Platform, Text} from 'react-native';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import NotifService from './NotifService';
import messaging from '@react-native-firebase/messaging';
import {localNotificationService} from './LocalNotification';
import {fcmService} from './FCMService';

import * as Sentry from '@sentry/react-native';
import {ThemeProvider} from '@shopify/restyle';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {enableScreens} from 'react-native-screens';

import {Icon, Box, Text as RNText, Okay} from 'components';
import {Main} from 'navigation';
import {Splash} from 'screens/Splash';
import configureStore from './store';
import theme from 'constants/theme/default';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {SwipeButton} from 'components';
// import {waait} from 'shared/utils';
import VersionNumber from 'react-native-version-number';
import {IS_ANDROID, IS_IOS} from 'constants/config';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

import {
  reactNativeDisableYellowBox,
  showNetworkRequests,
  showNetworkResponses,
} from 'constants/config';
import {
  SENTRY_ENDPOINT,
  // SENTRY_ENVIRONMENT,
} from '@env';
import glb from './globalVariables';
import monitorNetwork from 'shared/network';
const {android} = glb;

if (__DEV__) {
  LogBox.ignoreLogs(['Setting a timer']);
  reactNativeDisableYellowBox && LogBox.ignoreAllLogs();
  (showNetworkRequests || showNetworkResponses) &&
    monitorNetwork(showNetworkRequests, showNetworkResponses);
} else {
  let sentryOptions = {
    dsn: SENTRY_ENDPOINT,
    enableAutoSessionTracking: true,
    // environment: SENTRY_ENVIRONMENT,
    release: `ng.nosh-${VersionNumber.appVersion}`,
  };

  if (android) {
    const dist = VersionNumber.buildVersion;
    // In order for sourcemaps to work on android,
    // the release needs to be named with the following format
    // ng.nosh@1.0+4
    const releaseName = `ng.nosh@${VersionNumber.appVersion}+${dist}`;
    sentryOptions.release = releaseName;
    // and we also need to manually set the dist to the versionCode value
    sentryOptions.dist = dist.toString();
  }
  Sentry.init(sentryOptions);
}

enableScreens();

const {store, persistor} = configureStore();
function SetCustomText(customProps) {
  const TextRender = Text.render;
  const initialDefaultProps = Text.defaultProps;
  Text.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  Text.render = function render(props) {
    let oldProps = props;
    props = {...props, style: [customProps.style, props.style]};
    try {
      return TextRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
}

const TextProps = {
  style: {
    // color: 'blue',
    fontFamily: 'Hurme Geometric Sans 2',
    fontSize: Platform.OS === 'android' ? 13 : 14,
  },
};
SetCustomText(TextProps);

const queryClient = new QueryClient();
async function saveTokenToDatabase(token) {
  // console.log({token});
  // Assume user is already signed in
  // Add the token to the users datastore
  // console.log({token});
}
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
}

const App = () => {
  function onRegister(token) {
    return saveTokenToDatabase(token);
  }
  function onNotification(notify) {
    const {notification} = notify;
    const notification_payload = Platform.OS === 'ios' ? notify : notify.data;

    const options = {
      soundName: 'default',
      playSound: true,
    };
    localNotificationService.showNotification(
      0,
      notification.title,
      notification.body,
      {...notification, ...notification_payload},
      // notification_payload,
      options,
    );
  }
  function onOpenNotification(payload) {}

  useEffect(() => {
    (async () => {
      try {
        const enabled = await requestUserPermission();

        if (!enabled) return;
        fcmService.registerAppWithFCM();
        fcmService.register(onRegister, onNotification, onOpenNotification);

        localNotificationService.configure(onOpenNotification);
        return fcmService.unRegister;
      } catch (error) {
        Sentry.captureException(error);
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StatusBar
            barStyle="dark-content"
            // theme background of app
            backgroundColor="rgba(48,188,237,0.1)"
          />
          <QueryClientProvider client={queryClient}>
            {__DEV__ ? <Main /> : done ? <Main /> : <Splash {...{setDone}} />}
            {/* <SafeAreaView>
            <SwipeButton onToggle={handleToggle} {...{loading, title}} />
          </SafeAreaView> */}
          </QueryClientProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};

//     this.notif = new NotifService(
//       this.onRegister.bind(this),
//       this.onNotif.bind(this),
//     );
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>
//           Example app react-native-push-notification
//         </Text>
//         <View style={styles.spacer}></View>
//         <TextInput
//           style={styles.textField}
//           value={this.state.registerToken}
//           placeholder="Register token"
//         />
//         <View style={styles.spacer}></View>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.localNotif();
//           }}>
//           <Text>Local Notification (now)</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.localNotif('sample.mp3');
//           }}>
//           <Text>Local Notification with sound (now)</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.scheduleNotif();
//           }}>
//           <Text>Schedule Notification in 30s</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.scheduleNotif('sample.mp3');
//           }}>
//           <Text>Schedule Notification with sound in 30s</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.cancelNotif();
//           }}>
//           <Text>Cancel last notification (if any)</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.cancelAll();
//           }}>
//           <Text>Cancel all notifications</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.checkPermission(this.handlePerm.bind(this));
//           }}>
//           <Text>Check Permission</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.requestPermissions();
//           }}>
//           <Text>Request Permissions</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.abandonPermissions();
//           }}>
//           <Text>Abandon Permissions</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.getScheduledLocalNotifications((notifs) =>
//               console.log(notifs),
//             );
//           }}>
//           <Text>Console.Log Scheduled Local Notifications</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.getDeliveredNotifications((notifs) =>
//               console.log(notifs),
//             );
//           }}>
//           <Text>Console.Log Delivered Notifications</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.createOrUpdateChannel();
//           }}>
//           <Text>Create or update a channel</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.popInitialNotification();
//           }}>
//           <Text>popInitialNotification</Text>
//         </TouchableOpacity>

//         <View style={styles.spacer}></View>

//         {this.state.fcmRegistered && <Text>FCM Configured !</Text>}

//         <View style={styles.spacer}></View>
//       </View>
//     );
//   }

//   onRegister(token) {
//     this.setState({registerToken: token.token, fcmRegistered: true});
//   }

//   onNotif(notif) {
//     Alert.alert(notif.title, notif.message);
//   }

//   handlePerm(perms) {
//     Alert.alert('Permissions', JSON.stringify(perms));
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   button: {
//     borderWidth: 1,
//     borderColor: '#000000',
//     margin: 5,
//     padding: 5,
//     width: '70%',
//     backgroundColor: '#DDDDDD',
//     borderRadius: 5,
//   },
//   textField: {
//     borderWidth: 1,
//     borderColor: '#AAAAAA',
//     margin: 5,
//     padding: 5,
//     width: '70%',
//   },
//   spacer: {
//     height: 10,
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     textAlign: 'center',
//   },
// });
