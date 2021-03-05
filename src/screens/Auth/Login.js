import React from 'react';
import {connect, useStore} from 'react-redux';
import {Svg, Rect, Circle, Path} from 'react-native-svg';

import {Box, Text} from 'components';

const LoginScreen = () => {
  // redux works
  // let store = useStore().getState();
  // console.log({store});
  return (
    <Box>
      <Box margin="s">
        <Text color="primary">omo</Text>
      </Box>
      <Svg height="100" width="100">
        <Rect x="0" y="0" width="100" height="100" fill="black" />
        <Circle cx="50" cy="50" r="30" fill="yellow" />
        <Circle cx="40" cy="40" r="4" fill="black" />
        <Circle cx="60" cy="40" r="4" fill="black" />
        <Path d="M 40 60 A 10 10 0 0 0 60 60" stroke="black" />
      </Svg>
    </Box>
  );
};

// export const Login = () => connect()(LoginScreen);
export const Login = LoginScreen;
