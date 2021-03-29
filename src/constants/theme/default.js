import {createTheme} from '@shopify/restyle';

const BUTTON_HEIGHT = 62;
const INPUT_HEIGHT = 62;

export const palette = {
  // main colors
  blue: '#30bced',
  selectIconBlue: '#B4EBFF',
  fadedBlue: 'rgba(48,188,237,0.1)',
  mostBg: 'rgba(48,188,237,0.1)',
  mostBgPure: '#EAF8FD',
  greyBlue: 'rgba(48,188,237,0.2)',
  lightBlue: '#282356',
  transparent: 'transparent',
  orange: '#ff4000',
  green: '#3DAA9D',
  lightGreen: ' rgba(61,170,157,0.1)',
  darkGrey: '#525C6B',
  fadedBrown: '#DADADA',

  // black and white
  white: '#FFF',
  whiteFaded: 'rgba(255,255,255,0.5)',
  black: '#000',

  // red
  red: '#FF4000',

  // confused
  inputColor: 'rgba(40,35,86,0.5)',
  darkBlueButton: '#023248',
  fadedDarkBlueButton: '#005175',
  // fadedBlue: '#00405C',
  lightBlack: 'rgba(0, 0, 0, 0.6)',
  FAFAFA: '#FAFAFA',
};

const theme = createTheme({
  colors: {
    primary: palette.blue,
    secondary: palette.lightBlue,
    white: palette.white,
    whiteFaded: palette.whiteFaded,
    transparent: palette.transparent,
    success: palette.green,
    lightSuccess: palette.lightGreen,

    text: palette.darkGrey,
    fadedDarkBlueButton: palette.fadedDarkBlueButton,

    // specifics
    inputColor: palette.inputColor,
    authHeaderBackground: palette.fadedBlue,
    eyeBackground: palette.fadedBlue,
    mostBg: palette.fadedBlue,
    mostBgPure: palette.mostBgPure,

    buttonColor: palette.darkBlueButton,

    accent: '#ff4000',
    inactiveInputBorder: palette.greyBlue,
    error: palette.red,
    overlayBg: palette.lightBlack,
    disabledTextInput: palette.fadedBrown,
    lightGray: palette.FAFAFA,
    selectIconBlue: palette.selectIconBlue,
  },
  spacing: {
    xxs: 3,
    xs: 6,
    s: 8,
    m: 10,
    l: 22,
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
      fontFamily: 'Hurme Geometric Sans 2',
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

    // specifics
    button: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },
    buttonSwipe: {
      color: 'success',
      fontWeight: '600',
      fontSize: 12,
    },
    darkButton: {
      color: 'buttonColor',
      fontWeight: '600',
      fontSize: 16,
    },
    buttonDisabled: {
      color: 'primary',
      fontWeight: '600',
      fontSize: 16,
    },
  },
  buttonVariants: {
    defaults: {
      color: palette.darkBlueButton,
      height: BUTTON_HEIGHT,
      // color: palette.white,
      fontWeight: 'bold',
      fontSize: 16,
      borderWidth: undefined,
      textColor: 'white',
      disabled: {
        fontSize: 16,
        color: palette.fadedBlue,
        textColor: 'black',
      },
    },
    giftcard: {
      color: palette.darkBlueButton,
      height: BUTTON_HEIGHT,
      // color: palette.white,
      fontWeight: 'bold',
      fontSize: 16,
      borderWidth: 3,
      borderColor: '#C4ECFF',
      disabled: {
        fontSize: 16,
        color: palette.fadedBlue,
        textColor: 'black',
      },
    },
    faded: {
      height: BUTTON_HEIGHT,
      fontWeight: 'bold',
      fontSize: 16,
      borderWidth: undefined,
      color: palette.fadedBlue,
      textColor: 'black',
      disabled: {},
    },
  },
  inputVariants: {
    defaults: {
      height: INPUT_HEIGHT,
      fontFamily: 'Hurme Geometric Sans 2',
      fontSize: 16,
      borderWidth: 2,
      color: palette.inputColor,
      // placeholderTextColor: palette.inputColor,
    },
    profile: {
      height: INPUT_HEIGHT,
      fontFamily: 'Hurme Geometric Sans 2',
      fontSize: 16,
      borderWidth: 0,
      color: palette.fadedBrown,
      backgroundColor: 'lightGray',
      // placeholderTextColor: palette.inputColor,
    },
    giftcard: {
      height: 65,
      fontFamily: 'Hurme Geometric Sans 2',
      fontWeight: '400',
      fontSize: 24,
      borderWidth: 0,
      color: palette.blue,
      placeholderTextColor: palette.blue,
      backgroundColor: 'white',
    },
  },
  selectVariants: {
    defaults: {},
  },
  maxContentWidth: 500,
});

export default theme;
