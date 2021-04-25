import React, {useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, Platform, Image} from 'react-native';

import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import {
  Box,
  Text,
  Circle,
  Select,
  Divider,
  Button,
  HeaderInfo,
  Icon,
} from 'components';
import {GiftCardBox} from './GiftCardBox';

import data from 'constants/data';
import images from 'constants/images';
import {capitalizeFirstLetter} from 'shared/utils';
import * as Yup from 'yup';
import {useFormik} from 'formik';

// console.log(Dimensions.get('screen'));
const IS_ANDROID = Platform.OS === 'android';

const SubSchema = Yup.object().shape({
  // name: Yup.string().required('Required'),
  category: Yup.object()
    .nullable()
    .test("isnt't-null", 'Required', (value) =>
      Promise.resolve(value && Object.keys(value).length != 0),
    )
    .notOneOf([data.cardSub.value], 'Required')
    .required('Required'),
});

export const SubCategory = ({
  next,
  prev,
  data: giftCard,
  navigation,
  setSwiperHeight,
  setSubCategory,
  toWallet,
}) => {
  const toHottestCards = useCallback(
    () => navigation.navigate('HottestCards'),
    // () => navigation.navigate('Home', {screen: 'HottestCards'})
    [navigation],
  );
  // console.log(giftCard.cardSubCategories);
  const cardsubcategory = (giftCard?.cardSubCategories ?? []).map(
    (subCategory) => {
      return {
        value: subCategory,
        label: subCategory.name,
      };
    },
  );
  // const USD_AMOUNT = 1400;
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
    initialValues: {category: null},
    onSubmit: async (values) => {
      try {
        setSubCategory(values.category);
        next();
      } catch (error) {
        console.log({error});
      }
    },
    validationSchema: SubSchema,
  });
  const setcategoryValue = (str) => {
    // setFieldTouched('category', true);
    setFieldValue('category', str);
  };
  // console.log({errors, omo: data.cardSub});
  return (
    <Box>
      <HeaderInfo text="SELECT SUB-CATEGORY" />
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
      <GiftCardBox height={93} marginVertical="none" marginBottom="xxs">
        <Text fontSize={18} fontWeight="600">
          {capitalizeFirstLetter(giftCard?.name)}
        </Text>
      </GiftCardBox>
      <Box marginHorizontal="xl">
        <Select
          placeholder={data.cardSub}
          items={cardsubcategory}
          value={values.category}
          touched={touched.category}
          error={errors.category}
          onValueChange={setcategoryValue}
          errorTextProps={{marginLeft: 'l'}}
          onClose={() => {
            setFieldTouched('category', true);
          }}
        />
      </Box>

      <Box marginTop={IS_ANDROID ? 'none' : {bigScreen: 'xxxl', phone: 'xxl'}}>
        <Box
          flexDirection="row"
          marginTop={{bigScreen: 'xxxl', phone: 'xxl'}}
          style={{marginBottom: 7}}>
          <Box flex={1} alignItems="flex-end">
            <Image source={images.discount} />
          </Box>
          <TouchableOpacity onPress={toHottestCards} style={{flex: 1}}>
            <Box
              // flex={1}
              backgroundColor="lightSuccess"
              borderRadius={100}
              height={52}
              // maxWidth={150}
              justifyContent="center"
              flexDirection="row"
              alignItems="center">
              <Text fontSize={14} color="primary" fontWeight="600">
                Hottest{' '}
              </Text>
              <Text fontSize={14} color="buttonColor">
                Cards
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>

      <Box>
        {/* Button */}
        <Box
          alignItems="center"
          marginBottom="m"
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
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {width: 120, height: 84.38},
});
SubCategory.propTypes = {
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
