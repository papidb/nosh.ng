import React, {useRef, useState} from 'react';
import {TouchableWithoutFeedback, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';
import {Circle, Icon} from 'components';
// import Feather from 'react-native-vector-icons/Feather';
import {palette} from 'constants/theme';
import {Box} from './Box';
import {Text} from './Text';
// import {ErrorText} from './ErrorText';
import {useTheme} from '@shopify/restyle';

const CIRCLE_SIZE = 24;

export const Select = ({
  viewContainer,
  inputIOS,
  inputAndroid,
  iconContainer,
  isSubmitting,
  disabled,
  indicatorColor,
  labelStyle,
  label,
  touched,
  onOpen = () => {},
  // onValueChange = () => {},

  onClose,
  error,
  variant = 'defaults',
  labelVariant = 'label',
  innerContainerProps,
  LeftIcon,
  RightIcon,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const pickerRef = useRef(null);
  const openPicker = () => {
    pickerRef?.current?.togglePicker?.(true);
    // console.log(pickerRef?.current?.togglePicker);
  };
  // const tintColor = touched && !!error != true ? 'brandColor' : 'inputBorder';
  const tintColor = 'primary';

  const focus = () => {
    onOpen();
    setFocused(true);
  };
  const unFocus = () => setFocused(false);
  const realBlur = (event) => {
    unFocus();
    onClose(event);
  };
  const theme = useTheme();
  const variantProps = theme.selectVariants[variant];
  innerContainerProps = {
    ...variantProps?.innerContainerProps,
    ...innerContainerProps,
  };
  return (
    <Box>
      {label && (
        <Box
          position="absolute"
          backgroundColor="transparent"
          paddingHorizontal="s"
          top={0}
          zIndex={1}
          style={{marginLeft: 6}}
          marginLeft="s">
          <Text color={tintColor} variant={labelVariant}>
            {label}
          </Text>
        </Box>
      )}
      <TouchableWithoutFeedback onPress={() => openPicker()}>
        <Box marginVertical="xs">
          <Box
            borderWidth={1}
            borderColor={tintColor}
            flexDirection="row"
            alignItems="center"
            // height={40}
            paddingHorizontal="s"
            backgroundColor="transparent"
            borderRadius={23}
            {...innerContainerProps}>
            {LeftIcon}
            <Box flex={1} justifyContent="center">
              <RNPickerSelect
                ref={pickerRef}
                onOpen={focus}
                onClose={realBlur}
                style={{viewContainer, inputIOS, inputAndroid, iconContainer}}
                Icon={() => {
                  return (
                    <Circle size={CIRCLE_SIZE} backgroundColor="selectIconBlue">
                      <Icon
                        size={6}
                        name="icon-dropdown"
                        //   color={palette[tintColor]}
                      />
                    </Circle>
                  );
                }}
                disabled={isSubmitting}
                {...props}
              />
            </Box>
            {RightIcon}
          </Box>
          {/* <ErrorText {...{touched, error}} /> */}
        </Box>
      </TouchableWithoutFeedback>
    </Box>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  inputIOS: {
    fontSize: 12,
    fontFamily: 'Hurme Geometric Sans 1',
    color: palette.blue,
    fontWeight: '600',
    height: 36,
    // width: "100%",
    borderRadius: 5,
    // paddingHorizontal: 12,
    paddingTop: 0,
    backgroundColor: 'transparent',
    // color: colors.inputText,
    // borderColor: colors.inputGrey,
    // flex: 1,
    paddingLeft: 10,
    paddingRight: 30,
    // fontFamily: 'BwModelica-Medium',
    // flex: 1,
    // paddingLeft: 10,
  },
  inputAndroid: {
    fontSize: 12,
    fontFamily: 'Hurme Geometric Sans 1',
    color: palette.blue,
    fontWeight: '600',
    height: 36,
    marginTop: 5,
    // width: "100%",
    borderRadius: 5,
    // paddingHorizontal: 12,
    // paddingTop: 0,
    backgroundColor: 'white',
    // borderColor: colors.inputGrey,
    // fontFamily: 'BwModelica-Medium',
  },
  iconContainer: {
    top: (36 - CIRCLE_SIZE) / 2,
    // top: 4,
    right: 6,
  },
  labelStyle: {
    // marginVertical: 7.5,
    fontSize: 15,
    // fontFamily: 'nunito-regular',
  },
  errorInput: {color: 'red', fontSize: 12, paddingVertical: 2.5},
});

Select.defaultProps = {
  viewContainer: styles.viewContainer,
  inputIOS: styles.inputIOS,
  inputAndroid: styles.inputAndroid,
  iconContainer: styles.iconContainer,
  labelStyle: styles.labelStyle,
  errorInput: styles.errorInput,
  //   ...styles, // this would spread the styles object
};

const stylePropsType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.object),
  PropTypes.object,
]);

Select.propTypes = {
  viewContainer: stylePropsType,
  inputIOS: stylePropsType,
  iconContainer: stylePropsType,
  textStyle: stylePropsType,
};
