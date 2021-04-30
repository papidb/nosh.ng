import {Platform} from 'react-native';

export const URL = 'https://api.nosh.ng';

// export const URL = __DEV__
//   ? Platform.OS === 'android'
//     ? 'http://10.0.2.2:3434/'
//     : 'http://localhost:3434/'
//   : `${URL}/`;
export const BASE_URL = `${URL}/`;

export const reactNativeDisableYellowBox = true;
