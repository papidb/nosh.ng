import {createTheme} from '@shopify/restyle';

const BUTTON_HEIGHT = 52;
const INPUT_HEIGHT = 62;

export const palette = {
  // main colors
  blue: '#30bced',
  fadedBlue: 'rgba(48,188,237,0.1)',
  greyBlue: 'rgba(48,188,237,0.2)',
  lightBlue: '#282356',
  orange: '#ff4000',

  // black and white
  white: '#FFF',
  black: '#000',

  // red
  red: '#FF4000',

  // confused
  inputColor: 'rgba(40,35,86,0.5)',
};

const theme = createTheme({
  colors: {
    primary: palette.blue,
    secondary: palette.lightBlue,

    // specifics
    inputColor: palette.inputColor,
    authHeaderBackground: palette.fadedBlue,
    eyeBackground: palette.fadedBlue,

    accent: '#ff4000',
    inactiveInputBorder: palette.greyBlue,
    error: palette.red,
  },
  spacing: {
    xxs: 3,
    xs: 6,
    s: 8,
    m: 10,
    l: 20,
    xl: 32,
    xxl: 43,
    xxxl: 50,
    '-s': -8,
    '-m': -16,
    '-l': -24,
    '-xl': -32,
    '-xxl': -43,
    none: 0,
  },
  breakpoints: {
    phone: 0,
    bigScreen: 400,
  },
  textVariants: {
    defaults: {
      fontSize: 16,
      fontFamily: 'Hurme Geometric Sans 1',
    },
    small_light: {
      fontSize: 12,
    },
    small: {
      fontSize: 12,
    },
    bsmall: {
      fontSize: 12,
    },
    medium: {
      fontSize: 14,
    },
    bmedium: {
      fontSize: 14,
    },
    large: {
      fontSize: 16,
    },
    blarge: {
      fontSize: 16,
    },
  },
  buttonVariants: {
    defaults: {
      color: palette.blueish,
      height: BUTTON_HEIGHT,
      textColor: palette.white,
      fontWeight: 'bold',
      fontSize: 14,
      borderWidth: undefined,
      disabled: {
        // color: palette.ash,
      },
    },
  },
  inputVariants: {
    defaults: {
      height: INPUT_HEIGHT,
      fontFamily: 'Hurme Geometric Sans 1',
      fontSize: 16,
      borderWidth: 2,
      color: palette.inputColor,
      // placeholderTextColor: palette.inputColor,
    },
  },
  selectVariants: {
    default: {},
  },
  maxContentWidth: 500,
});

export default theme;
