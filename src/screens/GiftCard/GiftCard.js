import React, {useMemo, useCallback, useRef, useState, useEffect} from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/core';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';

import {Box, Text, Divider, Button, RaiseAndroid, Icon} from 'components';
import {
  SubGiftCard,
  SubCategory,
  SubUpload,
  SubAmount,
} from 'components/GiftCard';
import data from 'constants/data';
import {capitalizeFirstLetter} from 'shared/utils';

import {GiftCard as GiftCardImage} from '../../components/GiftCard/GiftCard';
import {getCards} from 'action';
import {connect} from 'react-redux';
import {
  showErrorSnackBar,
  showSuccessSnackBar,
  extractErrorMessage,
} from 'shared/utils';

const GiftCardScreen = ({getCards, cardSubCategories}) => {
  const navigation = useNavigation();

  const toWallet = () => navigation.navigate('Wallet');
  // Many many
  const [refreshing, setRefreshing] = React.useState(false);

  // get more data to use in app
  const getInfo = React.useCallback(async () => {
    return Promise.all([getCards()]);
  }, [getCards]);

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await getInfo();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, [getInfo]);
  const init = React.useCallback(async () => {
    (async () => {
      try {
        await getInfo();
      } catch (error) {
        console.log({error});
      }
    })();
  }, [getInfo]);
  useEffect(() => {
    console.log('running init');
    try {
      init();
      const unsubscribe = navigation.addListener('focus', async () => {
        try {
          console.log(
            'running these cause giftcard screen screen was focused on',
          );
          await getInfo();
          // await init();
        } catch (error) {}
      });
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    } catch (error) {
      const text = extractErrorMessage(error);
      showErrorSnackBar({text});
    }
  }, [getInfo, init, navigation]);
  // let [sliderIndex, setSliderIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [giftCard, setSelected] = useState(null);
  const [subCategory, setSubCategory] = useState({});
  const [height, setHeight] = useState(550);
  const setSwiperHeight = React.useCallback(
    (newHeight) => {
      // console.log({newHeight, height});
      setHeight(Math.max(newHeight, height));
    },
    [setHeight, height],
  );
  const selectedGiftCard = useMemo(() => cardSubCategories[index] || {}, [
    cardSubCategories,
    index,
  ]);

  const SubCategoryCallBack = useCallback(
    () => (
      <SubCategory
        {...{
          setSwiperHeight,
          prev: goBack,
          next: goToNextSlide,
          data: selectedGiftCard,
          navigation,
          setSubCategory,
        }}
      />
    ),
    [navigation, selectedGiftCard, setSwiperHeight, setSubCategory],
  );
  const SubAmountCallBack = useCallback(
    () => (
      <SubAmount
        {...{
          setSwiperHeight,
          prev: goBack,
          next: goToNextSlide,
          data: selectedGiftCard,
          setSubCategory,
          subCategory,
        }}
      />
    ),
    [selectedGiftCard, setSwiperHeight, subCategory, setSubCategory],
  );
  const SubUploadCallback = useCallback(
    () => (
      <SubUpload
        {...{
          setSwiperHeight,
          prev: goBack,
          next: goToNextSlide,
          data: selectedGiftCard,
          setSubCategory,
          subCategory,
        }}
      />
    ),
    [selectedGiftCard, setSwiperHeight, subCategory, setSubCategory],
  );

  // let toSubCategory = () => navigation.navigate('SubCategory');
  let swiperRef = useRef();
  const goToNextSlide = () => {
    swiperRef.current?.scrollBy(1);
  };
  const goBack = () => {
    swiperRef.current?.scrollBy(-1);
  };
  return (
    <Box flex={1}>
      <Divider marginBottom="l" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={giftcardStyles.scrollView}>
        {/* Header */}
        {/* Content */}

        <Swiper
          ref={swiperRef}
          key="omo"
          style={giftcardStyles.wrapper}
          containerStyle={{height: height}}
          showsButtons={false}
          showsPagination={false}
          scrollEnabled={false}
          loop={false}
          // style={{height: 250}}
          //
        >
          <SubGiftCard
            onSnapToItem={(slideIndex) => {
              setIndex(slideIndex);
              // console.log(cardSubCategories[slideIndex]);
              setSelected(cardSubCategories[slideIndex]);
              // setSelected(data.giftCards[slideIndex]);
            }}
            {...{
              setSwiperHeight,
              prev: goBack,
              next: goToNextSlide,
              cardSubCategories,
              selectedGiftCard: selectedGiftCard,
            }}
          />
          <SubCategoryCallBack />

          <SubAmountCallBack />
          <SubUploadCallback />
        </Swiper>
        <Box paddingHorizontal="l" marginBottom="l" marginTop="m">
          <Divider />
          {/* Nosh Wallet */}
          <TouchableOpacity onPress={toWallet}>
            <Box
              marginTop="s"
              // flex={1}
              backgroundColor="mostBg"
              borderRadius={100}
              padding="m"
              paddingLeft="xl"
              paddingRight="l"
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center">
              <Text color="primary" fontWeight="bold">
                NOSH WALLET
              </Text>
              <Icon name="icon-forwardgreen" size={14} />
            </Box>
          </TouchableOpacity>
        </Box>
        <RaiseAndroid />
      </ScrollView>
    </Box>
  );
};

export const GiftCard = connect(
  ({misc: {cardSubCategories}}) => ({cardSubCategories}),
  {getCards},
)(GiftCardScreen);

const giftcardStyles = StyleSheet.create({
  scrollView: {paddingHorizontal: 20},
  wrapper: {
    // height: 300,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'red',
  },
  slide: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD',
};
