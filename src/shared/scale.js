import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

// dimension from design
// iphone X
const baseWidth = 375;
const baseHeight = 812;

export const wp = (dimension) => wp2dp((dimension / baseWidth) * 100 + '%');
export const hp = (dimension) => hp2dp((dimension / baseHeight) * 100 + '%');
