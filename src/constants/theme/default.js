import {createTheme} from '@shopify/restyle';

const BUTTON_HEIGHT = 52;

export const palette = {
  // main colors
  blue: '#30bced',
  lightBlue: '#282356',
  orange: '#ff4000',

  // black and white
  white: '#FFF',
  black: '#000',
};

const theme = createTheme({
  colors: {
    primary: palette.blue,
    secondary: palette.lightBlue,
    accent: '#ff4000',
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
    default: {},
  },
  selectVariants: {
    default: {},
  },
  maxContentWidth: 500,
});

export default theme;
