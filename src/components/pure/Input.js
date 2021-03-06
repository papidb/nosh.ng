import React, {useState, useRef, useEffect} from 'react';
import {TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
// import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '@shopify/restyle';
import {Box} from './Box';
import {palette} from 'constants/theme';
// import {ErrorText} from './ErrorText';
/**
 *
 * @see https://lefkowitz.me/visual-guide-to-react-native-textinput-keyboardtype-options/
 */

export const Input = ({
  inputStyle,
  containerStyle,
  touched,
  error,
  passwordIcon,
  variant = 'defaults',
  labelVariant,
  passwordIcon: Icon,
  innerContainerProps,
  LeftIcon,
  RightIcon,
  ErrorTextStyles,
  nospace,
  ...props
}) => {
  const inputRef = useRef(null);
  const [focused, setFocus] = useState(false);

  const [state, setState] = useState({
    icon: 'eye-off',
    password: !!Icon,
  });

  const theme = useTheme();
  const variantProps = theme.inputVariants[variant];
  innerContainerProps = {
    ...variantProps?.innerContainerProps,
    ...innerContainerProps,
  };
  const ICON_SIZE = 20;

  // extract props you need in the container
  const {borderWidth, height, ...realInputStyle} = StyleSheet.flatten([
    variantProps,
    inputStyle,
  ]);
  const changeIcon = () => {
    setState((prevState) => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      password: !prevState.password,
    }));
  };
  let borderColor = focused
    ? 'primary'
    : touched && error
    ? 'error'
    : 'inactiveInputBorder';
  //   useEffect(() => {
  //     setTimeout(() => {
  //       console.log(inputRef?.current);
  //     }, 2000);
  //   }, []);
  return (
    <Box marginVertical={nospace ? 'none' : 's'}>
      <Box
        flexDirection="row"
        alignItems="center"
        padding="l"
        paddingHorizontal="xl"
        borderRadius={30}
        {...{borderWidth, borderColor, height}}
        {...innerContainerProps}>
        {LeftIcon}
        <Box flex={1}>
          <TextInput
            ref={inputRef}
            style={realInputStyle}
            secureTextEntry={state.password}
            placeholderTextColor={palette.inputColor}
            onFocus={() => {
              // make border color change
              console.log(`[onfocus]`);
              setFocus(true);
            }}
            onBlur={() => {
              // make border color on blur
              console.log(`[onBlur]`);
              setFocus(false);
            }}
            {...props}
          />
        </Box>
        {RightIcon}
        {Icon && (
          <TouchableOpacity onPress={() => changeIcon()}>
            <Box
              marginHorizontal="m"
              alignItems="center"
              justifyContent="center">
              {/* <Feather size={ICON_SIZE} name={state.icon} /> */}
            </Box>
          </TouchableOpacity>
        )}
      </Box>
      {/* <ErrorText {...{touched, error, ErrorTextStyles}} /> */}
    </Box>
  );
};

const stylePropsType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.object),
  PropTypes.object,
]);
