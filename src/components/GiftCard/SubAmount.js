import React, {useCallback} from 'react';
import {StyleSheet, Platform, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Box,
  Text,
  Circle,
  Input,
  Divider,
  Button,
  HeaderInfo,
  Icon,
} from 'components';
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
  amount,
  setAmount,
  toWallet,
}) => {
  const minimumAcceptableAmount = subCategory?.minimumAcceptableAmount ?? 200;
  const validate = (
    values,
    props /* only available when using withFormik */,
  ) => {
    const errors = {};

    if (!values.amount) {
      errors.amount = 'Required';
    } else if (values.amount < minimumAcceptableAmount) {
      errors.amount = `Minimum amount of ${minimumAcceptableAmount}`;
    }

    return errors;
  };

  // const AmountSchema = Yup.object().shape({
  //   amount: Yup.number().min(200, `Minimum amount of ${200}`),
  // });
  const IS_ANDROID = Platform.OS === 'android';

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
    validateForm,
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
        const omo = await validateForm();
        console.log({omo});
        setAmount(values.amount);
        next();
      } catch (error) {
        console.log({error});
      }
    },
    validate,
    // validationSchema: AmountSchema,
  });
  // console.log({subCategory});
  return (
    <Box>
      <KeyboardAwareScrollView>
        <HeaderInfo text="ENTER TRADE AMOUNT" />
        <Box
          justifyContent="space-between"
          flexDirection="row"
          marginVertical="m"
          marginBottom="xs">
          <TouchableOpacity onPress={prev}>
            <Circle size={42} backgroundColor="white">
              <Icon name="icon-backward" size={14} />
            </Circle>
          </TouchableOpacity>

          <FastImage
            source={{uri: imageUri, priority: FastImage.priority.high}}
            style={styles.image}
          />
        </Box>
        <GiftCardBox height={93} style={styles.giftCardBox}>
          <Text fontSize={16} fontWeight="600" textAlign="center">
            {capitalizeFirstLetter(subCategory?.name)}
          </Text>
        </GiftCardBox>
        <Input
          variant="giftcard"
          placeholder="0.00"
          keyboardType="number-pad"
          // RightIcon={
          //   <Text fontSize={12} fontWeight="600" color="primary">
          //     USD
          //   </Text>
          // }
          onChangeText={handleChange('amount')}
          onBlur={handleBlur('amount')}
          error={errors.amount}
          touched={touched.amount}
          value={values.amount}
          nospace
        />
        <Box marginHorizontal="xl" marginVertical="xs" marginTop="m">
          <Text fontSize={12} fontWeight="600" color="success">
            YOU GET PAID
          </Text>
        </Box>

        <GiftCardBox
          // marginVertical="m"
          // marginBottom="xs"
          flexDirection="row"
          backgroundColor="mostBg"
          justifyContent="space-between"
          // height={62}
          style={{
            marginBottom: 33,
          }}>
          <Text fontSize={24} color="success">
            {commaFormatter(subCategory?.rate * values.amount)}
          </Text>
          <Text fontSize={12} fontWeight="600" color="success">
            NGN
          </Text>
        </GiftCardBox>
        <Box
          marginTop={IS_ANDROID ? 'none' : {bigScreen: 'xxxl', phone: 'xxl'}}
        />
        {/* Button */}
        <Box
          alignItems="center"
          marginBottom="s"
          style={{marginHorizontal: 14}}>
          <Button variant="giftcard" text="Continue" onPress={handleSubmit} />
        </Box>
        <Box>
          <Divider style={{marginBottom: 7, marginHorizontal: 31}} />
          {/* Nosh Wallet */}
          <TouchableOpacity onPress={toWallet}>
            <Box
              backgroundColor="mostBg"
              borderRadius={100}
              height={38}
              padding="m"
              paddingLeft="xl"
              paddingRight="l"
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
              style={{marginHorizontal: 20}}>
              <Text color="primary" fontWeight="600" fontSize={12}>
                NOSH WALLET
              </Text>
              <Icon name="icon-forwardgreen" size={14} />
            </Box>
          </TouchableOpacity>
        </Box>
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
  header: {marginTop: 6, marginBottom: 6.5},
  giftCardBox: {marginBottom: 8},
});
