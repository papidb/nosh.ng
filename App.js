/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';

import {Main} from 'navigation';
import theme from 'constants/theme/default';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <Main />
    </ThemeProvider>
  );
};

export default App;
