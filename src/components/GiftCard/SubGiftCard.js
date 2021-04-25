import React, {useMemo, useRef, useState} from 'react';
import {
  ScrollView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

// import Carousel from 'react-native-snap-carousel';

import {Box, Select, Text, Icon, Divider, Button, HeaderInfo} from 'components';
import data from 'constants/data';
import {capitalizeFirstLetter} from 'shared/utils';
import Carousel, {getInputRangeFromIndexes} from 'react-native-snap-carousel';

import {GiftCard} from './GiftCard';
import {useFormik} from 'formik';

const CAROUSEL_WIDTH = Dimensions.get('screen').width - 2 * 30;
const IS_ANDROID = Platform.OS === 'android';

export const SubGiftCard = ({
  onSnapToItem,
  // selectedGiftCard,
  next,
  setSwiperHeight,
  cardSubCategories = [],
  toWallet,
}) => {
  const [index, setIndex] = useState(0);
  const [giftCard, setSelected] = useState(null);
  const cardCategorySelect = cardSubCategories.map((cardCategory, index) => ({
    label: cardCategory.name,
    value: index,
  }));
  const selectedGiftCard = useMemo(() => cardSubCategories[index] || {}, [
    cardSubCategories,
    index,
  ]);
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
        // setSubCategory(values.category);
        next();
      } catch (error) {
        console.log({error});
      }
    },
    // validationSchema: SubSchema,
  });
  const setcategoryValue = (str) => {
    console.log(str);
    setIndex(str);
    // setFieldTouched('category', true);
    setFieldValue('category', str);
  };
  // console.log({selectedGiftCard});
  return (
    <Box overflow="hidden">
      <HeaderInfo text="SWIPE THROUGH TO SELECT CATEGORY" />
      <Box
        height={IS_ANDROID ? 200 : 250}
        alignItems="center"
        marginVertical={{bigScreen: 'l', phone: 'l'}}>
        <Carousel
          data={cardSubCategories}
          layout="stack"
          // removeClippedSubviews={false}
          useScrollView={true}
          layoutCardOffset={'9'}
          loop
          // scrollInterpolator={_scrollInterpolator}
          // slideInterpolatedStyle={_animatedStyles}
          renderItem={GiftCard}
          sliderWidth={CAROUSEL_WIDTH}
          itemWidth={CAROUSEL_WIDTH}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          onSnapToItem={(slideIndex) => {
            onSnapToItem(slideIndex);
            setIndex(slideIndex);
            setSelected(cardSubCategories[slideIndex]);
          }}
        />
      </Box>
      <Box marginHorizontal="xl" marginVertical={IS_ANDROID ? 'none' : 'm'}>
        <Select
          placeholder={data.cardCategory}
          items={cardCategorySelect}
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
      <Box marginTop="l">
        <Text
          color="primary"
          fontWeight="600"
          textAlign="center"
          fontSize={12}
          style={styles.clickHere}>
          CLICK HERE TO BEGIN
        </Text>
      </Box>

      <Box alignItems="center" marginBottom="m" style={{marginHorizontal: 15}}>
        <Button
          variant="giftcard"
          text={capitalizeFirstLetter(selectedGiftCard?.name ?? 'Card')}
          onPress={next}
        />
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
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: colors.black,
  },
  clickHere: {
    marginBottom: 12,
  },
  container: {
    flex: 1,
    // backgroundColor: colors.background1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollview: {
    flex: 1,
  },
  exampleContainer: {
    paddingVertical: 30,
  },
  exampleContainerDark: {
    // backgroundColor: colors.black,
  },
  exampleContainerLight: {
    backgroundColor: 'white',
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  titleDark: {
    // color: colors.black,
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  slider: {
    // marginTop: 15,
    paddingLeft: 20,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});
