/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar, LogBox, Platform, Text} from 'react-native';
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
import VersionNumber from 'react-native-version-number';

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
  reactNativeDisableYellowBox && LogBox.ignoreAllLogs();
  (showNetworkRequests || showNetworkResponses) &&
    monitorNetwork(showNetworkRequests, showNetworkResponses);
} else {
}

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
const App = () => {
  const [done, setDone] = React.useState(false);
  const [toggleState, setToggleState] = React.useState(false);
  const handleToggle = (value) => setToggleState(value);

  // React.useEffect(() => {
  //   FontManager.init();
  //   FontManager.override({
  //     fontFamily: 'Hurme Geometric Sans 2',
  //   });
  // }, []);
  console.log({toggleState});
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StatusBar
            barStyle="dark-content"
            // theme background of app
            backgroundColor="rgba(48,188,237,0.1)"
          />
          {__DEV__ ? <Main /> : done ? <Main /> : <Splash {...{setDone}} />}
          {/* <SafeAreaView>
            <SwipeButton onToggle={handleToggle} />
          </SafeAreaView> */}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
