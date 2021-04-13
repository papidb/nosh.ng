import React from 'react';

import {Box} from 'components';
import LottieView from 'lottie-react-native';

// import SplashLottie from 'assets/lottie/Splash.json';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Splash = ({setDone}) => {
  return (
    <Box flex={1}>
      <LottieView
        source={require('./splash.json')}
        loop={false}
        onAnimationFinish={() => {
          setDone(true);
        }}
        autoPlay
      />
    </Box>
  );
};
