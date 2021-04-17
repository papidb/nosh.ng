import React, {useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import {Box, Text, Circle, Select, Button, HeaderInfo, Icon} from 'components';
import {GiftCardBox} from './GiftCardBox';

import data from 'constants/data';
import images from 'constants/images';
import {capitalizeFirstLetter} from 'shared/utils';
import * as Yup from 'yup';
import {useFormik} from 'formik';

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
    setFieldTouched('category', true);
    setFieldValue('category', str);
  };
  console.log({errors, omo: data.cardSub});
  return (
    <Box
      onLayout={({
        nativeEvent: {
          layout: {height},
        },
      }) => {
        setSwiperHeight(height);
      }}>
      <HeaderInfo text="SELECT SUB-CATEGORY" />
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
        <Text fontSize={18} fontWeight="600">
          {capitalizeFirstLetter(giftCard?.name)}
        </Text>
      </GiftCardBox>
      <Select
        placeholder={data.cardSub}
        // onClose={console.log}
        // onValueChange={(string) => console.log({string})}
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
      <Box flexDirection="row" marginVertical="xs" marginTop="l">
        <Box flex={1} />
        <Image source={images.discount} />
        <TouchableOpacity onPress={toHottestCards} style={{flex: 1}}>
          <Box
            // flex={1}
            backgroundColor="lightSuccess"
            borderRadius={100}
            padding="l"
            height={52}
            justifyContent="center"
            flexDirection="row"
            alignItems="center">
            <Text fontSize={14} color="primary" fontWeight="700">
              Hottest{' '}
            </Text>
            <Text fontSize={14} color="buttonColor">
              Cards
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>

      {/* Button */}
      <Button variant="giftcard" text="Continue" onPress={handleSubmit} />
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {width: 120, height: 67.5},
});
SubCategory.propTypes = {
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
