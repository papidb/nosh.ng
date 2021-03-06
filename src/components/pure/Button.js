import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {useTheme} from '@shopify/restyle';

import {Text} from './Text';
import {Box} from './Box';

import {palette} from 'constants/theme';

export const Button = ({
  disabled,
  loading,
  variant = 'defaults',
  text,
  onPress,
  color: buttonColorName = palette.black,
  textVariant = 'button',
  disabledTextVariant = 'buttonDisabled',
  style,
  containerProps,
}) => {
  const theme = useTheme();
  const variantProps = theme.buttonVariants[variant];
  const disabledProps = disabled ? variantProps.disabled || {} : {};
  //   const disabledTextProps = disabled ? variantProps.disabled || {} : {};
  const themedStyles = {...variantProps, ...disabledProps};
  const {
    fontSize,
    fontWeight,
    fontFamily,
    color,
    borderWidth,
    height,
    borderRadius = 33,
  } = themedStyles;
  const textColor = themedStyles.textColor;
  const borderColor = themedStyles.borderColor;
  const buttonColor = buttonColorName && theme.colors[buttonColorName];

  const onPressHandler = loading ? () => {} : onPress;
  const realTextVariant = disabled ? disabledTextVariant : textVariant;
  const content = (
    <Box
      alignItems="center"
      justifyContent="center"
      style={{
        backgroundColor: buttonColor || color,
        minHeight: height,
        borderWidth,
        borderColor: borderColor || buttonColor,
        borderRadius: borderRadius,
        ...style,
      }}
      paddingHorizontal="m"
      flexDirection="row"
      {...{containerProps}}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          <Text
            variant={realTextVariant}
            style={{
              ...styles.content,
              //   color: textColor || buttonColor,
              //   fontWeight,
              //   fontFamily,
              //   fontSize,
            }}>
            {text}
          </Text>
        </>
      )}
    </Box>
  );

  // if (Platform.OS === 'android') {
  //   return (
  //     <MaterialRipple
  //       rippleContainerBorderRadius={4}
  //       rippleDuration={500}
  //       // style={containerStyle}
  //       onPress={onPressHandler}
  //       {...{disabled}}>
  //       {content}
  //     </MaterialRipple>
  //   );
  // }
  return (
    <TouchableOpacity
      onPress={onPressHandler}
      style={[styles.stretch]}
      disabled={loading}
      {...{disabled}}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
  },
  stretch: {
    alignSelf: 'stretch',
  },
  content: {
    textAlign: 'center',
  },
});
