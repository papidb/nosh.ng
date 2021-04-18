import React from 'react';
import {TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import Layout from 'constants/Layout';
import {Box} from './Box';
import {Text} from './Text';
import {Close} from 'components';

// export const Loading = (props) => {
//   return (
//     <LottieView
//       autoPlay
//       loop
//       source={require('@assets/animation/loading.json')}
//       {...props}
//     />
//   );
// };

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
      marginTop: 40,
      marginBottom: Layout.window.width * 0.4,
      justifyContent: 'center',
    }}
    {...props}
  />
);

export const Okay = ({offModal = () => {}, text, ...props}) => {
  return (
    <Box
      backgroundColor="mostBg"
      height={Layout.window.height}
      width={Layout.window.width}
      //
    >
      <TouchableOpacity>
        <Close
          onPress={offModal}
          circleProps={{style: {marginTop: 16, marginRight: 16}}}
        />
      </TouchableOpacity>

      <Box alignItems="center">
        <OkayLottie {...{props}} />
      </Box>

      <Text textAlign="center" color="primary" fontSize={12} fontWeight="600">
        {text
          ? text
          : 'We are processing this Transaction.\nWe will get back shortly...'}
      </Text>
    </Box>
  );
};
