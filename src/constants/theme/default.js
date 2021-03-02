import {createTheme} from '@shopify/restyle';

const BUTTON_HEIGHT = 52;

export const palette = {
  // main colors
  primary: '#30bced',
  secondary: '#282356',
  accent: '#ff4000',

  // black and white
  white: '#FFF',
  black: '#000',
};

const theme = createTheme({
  colors: {
    ...palette,
  },
  spacing: {
    /* eslint-disable id-length */
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
    /* eslint-enable id-length */
  },
  breakpoints: {
    phone: 0,
    bigScreen: 400,
  },
  textVariants: {
    button: {
      fontSize: 18,
      disabled: {},
    },
    bodyText: {},
    header: {
      color: 'deepOrange',
      fontWeight: 'bold',
      fontSize: 18,
    },
    label: {
      fontSize: 14,
      color: 'orange',
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
    default: {
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
