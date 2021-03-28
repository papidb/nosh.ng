import React, {useState, useRef} from 'react';
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
// import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '@shopify/restyle';
import {Box} from './Box';
import {Icon as SvgIcon} from './Icon';
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
  onBlur: componentOnBlur,
  onFocus: componentOnFocus,
  ...props
}) => {
  const inputRef = useRef(null);
  const [focused, setFocus] = useState(false);

  const [state, setState] = useState({
    icon: 'eye_off',
    password: !!Icon,
  });

  const theme = useTheme();
  const variantProps = theme.inputVariants[variant];
  innerContainerProps = {
    ...variantProps?.innerContainerProps,
    ...innerContainerProps,
  };
  const ICON_SIZE = 27;

  // extract props you need in the container
  const {
    borderWidth,
    height,
    backgroundColor = palette.transparent,
    placeholderTextColor = palette.inputColor,
    ...realInputStyle
  } = StyleSheet.flatten([variantProps, inputStyle]);
  const changeIcon = () => {
    setState((prevState) => ({
      icon: prevState.icon === 'eye' ? 'eye_off' : 'eye',
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
  const paddingRight = Icon ? {paddingRight: 'm'} : {};
  return (
    <Box marginVertical={nospace ? 'none' : 's'}>
      <TouchableWithoutFeedback
        onPress={() => {
          try {
            //   TODO: test onfocus on android
            inputRef?.current?.focus();
          } catch (err) {
            //   log error
          }
        }}>
        <Box
          flexDirection="row"
          alignItems="center"
          padding="l"
          paddingHorizontal="xl"
          borderRadius={30}
          {...{borderWidth, borderColor, height, backgroundColor}}
          {...paddingRight}
          {...innerContainerProps}>
          {LeftIcon}
          <Box flex={1}>
            <TextInput
              ref={inputRef}
              style={[
                realInputStyle,
                Platform.OS === 'android' ? {height: 40} : {},
              ]}
              secureTextEntry={state.password}
              placeholderTextColor={placeholderTextColor}
              onFocus={(event) => {
                // make border color change
                setFocus(true);
                if (componentOnFocus) {
                  componentOnFocus?.(event);
                }
              }}
              onBlur={(event) => {
                // make border color on blur
                setFocus(false);
                if (componentOnBlur) {
                  componentOnBlur?.(event);
                }
              }}
              {...props}
            />
          </Box>
          {RightIcon}
          {Icon && (
            <TouchableOpacity onPress={() => changeIcon()}>
              <Box
                height={43}
                width={43}
                borderRadius={43}
                backgroundColor="eyeBackground"
                alignItems="center"
                justifyContent="center">
                <SvgIcon size={ICON_SIZE} name={state.icon} />
              </Box>
            </TouchableOpacity>
          )}
        </Box>
        {/* <ErrorText {...{touched, error, ErrorTextStyles}} /> */}
      </TouchableWithoutFeedback>
    </Box>
  );
};

const stylePropsType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.object),
  PropTypes.object,
]);
Input.propTypes = {
  inputStyle: stylePropsType,
  containerStyle: stylePropsType,
  innerContainerProps: stylePropsType,
  ErrorTextStyles: stylePropsType,
  touched: PropTypes.bool,
  error: PropTypes.string,
  passwordIcon: PropTypes.bool,
  variant: PropTypes.string,
  labelVariant: PropTypes.string,
  LeftIcon: PropTypes.bool,
  RightIcon: PropTypes.any,
  nospace: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};
