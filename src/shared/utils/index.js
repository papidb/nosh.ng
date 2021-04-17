import shortid from 'shortid';
import Snackbar from 'react-native-snackbar';
import {Keyboard} from 'react-native';
import {palette} from 'constants/theme';

export * from './currency.utils';
export * from './data.utils';
export * from './network.utils';

export const uuid = () => shortid.generate();

export const waait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export function truncateString(string = '', maxLen = 25) {
  return string.length > maxLen
    ? string.substring(0, maxLen - 3) + '...'
    : string;
}

export function getFirstLetter(string = '') {
  return string.charAt(0);
}
export function capitalizeFirstLetter(string = '') {
  string = String(string);
  return getFirstLetter(string).toUpperCase() + string.slice(1);
}

export const generateReadableName = (user) =>
  `${user.firstName} ${getFirstLetter(user.lastName).toUpperCase()}.`;

export const showSuccessSnackBar = (options) => {
  const text = options.text ? options.text : 'Something went wrong';
  try {
    Keyboard.dismiss();
  } catch (error) {}
  return Snackbar.show({
    duration: Snackbar.LENGTH_LONG,
    fontFamily: 'Hurme Geometric Sans 2',
    backgroundColor: palette.blue,
    textColor: 'black',
    ...options,
    text,
  });
};
export const showErrorSnackBar = async (options) => {
  const text = options.text ? options.text : 'Something went wrong';
  try {
    const vibrationOption = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };

    Keyboard.dismiss();
    // await ReactNativeHapticFeedback.trigger(
    //   'notificationError',
    //   vibrationOption,
    // );
  } catch (error) {}
  return Snackbar.show({
    duration: Snackbar.LENGTH_LONG,
    fontFamily: 'Hurme Geometric Sans 2',
    backgroundColor: palette.red,
    ...options,
    text,
  });
};
