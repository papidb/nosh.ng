import {Platform} from 'react-native';

export const URL = 'https://api.nosh.ng';

// export const URL = __DEV__
//   ? Platform.OS === 'android'
//     ? 'http://10.0.2.2:3434/'
//     : 'http://localhost:3434/'
//   : `${URL}/`;
export const BASE_URL = `${URL}/`;

export const reactNativeDisableYellowBox = true;
export const showNetworkRequests = false;
export const showNetworkResponses = false;
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
