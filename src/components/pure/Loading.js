import React from 'react';
import {Platform, ActivityIndicator} from 'react-native';
import LottieView from 'lottie-react-native';
import Layout from 'constants/Layout';
import {Box} from './Box';
import {Text} from './Text';
import {Close} from './Close';
import {palette} from 'constants/theme';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import {hp, wp} from 'shared/scale';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const IS_ANDROID = Platform.OS === 'android';

const height = ExtraDimensions.getRealWindowHeight();
export const Loading = (props) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator color={palette.blue} />
    </Box>
  );
  // return (
  //   <LottieView
  //     autoPlay
  //     loop
  //     source={require('@assets/animation/loading.json')}
  //     {...props}
  //   />
  // );
};

// export const Empty = (props) => {
//   return (
//     <LottieView
//       autoPlay
//       loop={false}
//       style={{width: Layout.window.width}}
//       source={require('@assets/animation/empty.json')}
//       {...props}
//     />
//   );
// };

const OkayLottie = (props) => (
  <LottieView
    autoPlay
    source={require('assets/animation/ok.json')}
    style={{
      height: (Layout.window.width * 2) / 3,
      // marginTop: 100,
      marginTop: Layout.window.height * 0.1,
      justifyContent: 'center',
    }}
    {...props}
  />
);

export const Okay = ({offModal = () => {}, text, ...props}) => {
  const {top} = useSafeAreaInsets();
  const CLOSE_SPACING = top + 16;
  return (
    <Box
      // flex={1}
      // backgroundColor="mostBg"
      height={height}
      width={Layout.window.width}
      //
    >
      <Box position="absolute" top={-25} right={0}>
        <Close
          onPress={offModal}
          circleProps={{style: {marginTop: CLOSE_SPACING, marginRight: 16}}}
        />
      </Box>

      <Box alignItems="center" marginTop={{bigScreen: 'xxl', phone: 'l'}}>
        <OkayLottie {...{props}} />
      </Box>

      <Box
        position="absolute"
        alignSelf="center"
        bottom={
          IS_ANDROID
            ? 250 * Layout.aspectRatio
            : -Layout.window.height + hp(100)
        }>
        <Text textAlign="center" color="primary" fontSize={12} fontWeight="600">
          {text
            ? text
            : 'We are processing this Transaction.\nWe will get back shortly...'}
        </Text>
      </Box>
    </Box>
  );
};
