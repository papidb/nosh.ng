/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar, Text} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {enableScreens} from 'react-native-screens';

import {Main} from 'navigation';
import {Splash} from 'screens/Splash';
import configureStore from './store';
import theme from 'constants/theme/default';

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
  },
};
SetCustomText(TextProps);
const App = () => {
  const [done, setDone] = React.useState(false);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StatusBar barStyle="dark-content" />
          {done ? <Main /> : <Splash {...{setDone}} />}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
