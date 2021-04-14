import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Box, Text, Circle, Button, HeaderInfo, Icon, Input} from 'components';
import {GiftCardBox} from './GiftCardBox';

import images from 'constants/images';
import {capitalizeFirstLetter} from 'shared/utils';
import {palette} from 'constants/theme';
import FastImage from 'react-native-fast-image';
import {useFormik} from 'formik';

export const SubUpload = ({
  next,
  prev,
  data: giftCard,
  setSwiperHeight,
  subCategory,
}) => {
  // const imageUri = `https://api.nosh.ng/uploads/images/cards/${giftCard.title}.png`;
  const imageUri = giftCard.avatar;
  const {
    errors,
    values,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    isSubmitting,
    // validateForm,
    // resetForm,
    setFieldValue,
    // setValues,
    setFieldTouched,
    // isValid,
    // dirty,
  } = useFormik({
    initialValues: {comment: ''},
    onSubmit: async (values) => {
      try {
        console.log({values});
      } catch (error) {
        console.log({error});
      }
    },
    // validationSchema: AmountSchema,
  });
  // const USD_AMOUNT = 1400;
  return (
    <Box
      onLayout={({
        nativeEvent: {
          layout: {height},
        },
      }) => {
        setSwiperHeight(height);
      }}>
      <KeyboardAwareScrollView>
        <HeaderInfo text="UPLOAD GIFTCARD (S)" />
        <Box
          justifyContent="space-between"
          flexDirection="row"
          marginVertical="m">
          <TouchableOpacity
            onPress={() => {
              prev();
            }}>
            <Circle size={42} backgroundColor="white">
              <Icon name="icon-backward" size={14} />
            </Circle>
          </TouchableOpacity>

          <FastImage
            source={{uri: imageUri, priority: FastImage.priority.high}}
            style={styles.image}
          />
        </Box>
        <GiftCardBox marginVertical="m">
          <Text fontSize={16} fontWeight="600">
            {capitalizeFirstLetter(subCategory?.name)}
          </Text>
        </GiftCardBox>
        <TouchableOpacity>
          <GiftCardBox marginVertical="m" padding="none">
            <Text fontSize={18} fontWeight="600">
              <Icon name="icon-cart" size={43.2} />
            </Text>
          </GiftCardBox>
          <Text
            color="primary"
            fontSize={12}
            fontWeight="bold"
            textAlign="center"
            marginVertical="xs">
            CLICK HERE TO UPLOAD CARD
          </Text>
        </TouchableOpacity>

        <Box backgroundColor="transparent" marginVertical="m">
          <Input
            onChangeText={handleChange('comment')}
            onBlur={handleBlur('comment')}
            error={errors.comment}
            touched={touched.comment}
            value={values.comment}
            placeholder="+ Add Optional comments"
            LeftIcon={<Icon name="icon-edit_colored" size={25} />}
            variant="profile"
            textAlign="right"
            placeholderTextColor={palette.green}
            inputStyle={{fontSize: 13, color: palette.green}}
            innerContainerProps={{height: 40, padding: 'm'}}
            nospace
          />
        </Box>
        {/* Button */}
        <Button
          variant="giftcard"
          text="SWIPE TO SELL"
          disabled={isSubmitting}
          onPress={handleSubmit}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};
const styles = StyleSheet.create({
  image: {width: 120, height: 67.5},
});

SubUpload.propTypes = {
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
