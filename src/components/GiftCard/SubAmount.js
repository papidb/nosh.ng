import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Box, Text, Circle, Input, Button, HeaderInfo, Icon} from 'components';
import {GiftCardBox} from './GiftCardBox';

import {commaFormatter} from 'shared/utils';
import images from 'constants/images';
import {capitalizeFirstLetter} from 'shared/utils';
import FastImage from 'react-native-fast-image';
import {useFormik} from 'formik';
import * as Yup from 'yup';

export const SubAmount = ({
  next,
  prev,
  data: giftCard,
  setSwiperHeight,
  subCategory,
}) => {
  const AmountSchema = Yup.object().shape({
    amount: Yup.number().min(
      subCategory.minimumAcceptableAmount,
      `Minimum amount of ${subCategory.minimumAcceptableAmount}`,
    ),
  });

  // const imageUri = `https://api.nosh.ng/uploads/images/cards/${giftCard.title}.png`;
  const imageUri = giftCard.avatar;
  const USD_AMOUNT = 1400;
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
    initialValues: {amount: ''},
    onSubmit: async (values) => {
      try {
        console.log({values});
        next();
      } catch (error) {
        console.log({error});
      }
    },
    validationSchema: AmountSchema,
  });
  // console.log({subCategory});
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
        <HeaderInfo text="ENTER TRADE AMOUNT" />
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
        <Input
          variant="giftcard"
          placeholder="Enter Amount"
          keyboardType="number-pad"
          RightIcon={
            <Text fontSize={12} fontWeight="600" color="primary">
              USD
            </Text>
          }
          onChangeText={handleChange('amount')}
          onBlur={handleBlur('amount')}
          error={errors.amount}
          touched={touched.amount}
          value={values.amount}
        />
        {/* <Input
          variant="giftcard"
          placeholder="Enter Amount"
          keyboardType="number-pad"
          RightIcon={
            <Text fontSize={12} fontWeight="600" color="primary">
              NGN
            </Text>
          }
          innerContainerProps={{backgroundColor: 'mostBg'}}
          editable={false}
          value={commaFormatter(subCategory?.rate * values.amount)}
        /> */}
        <GiftCardBox
          marginVertical="m"
          flexDirection="row"
          backgroundColor="mostBg"
          justifyContent="space-between"
          height={62}>
          <Text fontSize={24} fontWeight="400" color="success">
            {commaFormatter(subCategory?.rate * values.amount)}
          </Text>
          <Text fontSize={12} fontWeight="600" color="success">
            NGN
          </Text>
        </GiftCardBox>

        <Box marginHorizontal="xl" marginTop="s" marginBottom="l">
          <Text fontSize={12} fontWeight="600" color="success">
            YOU GET PAID
          </Text>
        </Box>

        {/* Button */}
        <Button variant="giftcard" text="Continue" onPress={handleSubmit} />
      </KeyboardAwareScrollView>
    </Box>
  );
};

SubAmount.propTypes = {
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  image: {width: 120, height: 67.5},
});
