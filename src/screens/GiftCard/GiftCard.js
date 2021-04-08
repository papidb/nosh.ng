import React, {useMemo, useRef, useState} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {useNavigation} from '@react-navigation/core';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';

import {Box, Text, Divider, Button, HeaderInfo, Icon} from 'components';
import {
  SubGiftCard,
  SubCategory,
  SubUpload,
  SubAmount,
} from 'components/GiftCard';
import data from 'constants/data';
import {capitalizeFirstLetter} from 'shared/utils';

import {GiftCard as GiftCardImage} from '../../components/GiftCard/GiftCard';

export const GiftCard = () => {
  // let [sliderIndex, setSliderIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [giftCard, setSelected] = useState(null);
  const [height, setHeight] = useState(458);
  const setSwiperHeight = React.useCallback(
    (newHeight) => {
      console.log({newHeight, height});
      setHeight(Math.max(newHeight, height));
    },
    [setHeight, height],
  );
  const selectedGiftCard = useMemo(() => data.giftCards[index], [index]);

  let navigation = useNavigation();
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
      <ScrollView style={giftcardStyles.scrollView}>
        {/* Header */}
        {/* Content */}

        <Swiper
          ref={swiperRef}
          style={giftcardStyles.wrapper}
          containerStyle={{height: height}}
          showsButtons={false}
          showsPagination={false}
          scrollEnabled={false}
          // style={{height: 250}}
          //
        >
          <SubGiftCard
            onSnapToItem={(slideIndex) => {
              setIndex(slideIndex);
              setSelected(data.giftCards[slideIndex]);
            }}
            {...{
              setSwiperHeight,
              prev: goBack,
              next: goToNextSlide,
              selectedGiftCard: selectedGiftCard,
            }}
          />
          <SubCategory
            {...{
              setSwiperHeight,
              prev: goBack,
              next: goToNextSlide,
              data: selectedGiftCard,
            }}
          />
          <SubAmount
            {...{
              setSwiperHeight,
              prev: goBack,
              next: goToNextSlide,
              data: selectedGiftCard,
            }}
          />
          <SubUpload
            {...{
              setSwiperHeight,
              prev: goBack,
              next: goToNextSlide,
              data: selectedGiftCard,
            }}
          />
        </Swiper>
        <Box paddingHorizontal="l" marginBottom="l" marginTop="l">
          <Divider />
          {/* Nosh Wallet */}
          <TouchableOpacity
            onPress={() => {
              // goToNextSlide();
            }}>
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
      </ScrollView>
    </Box>
  );
};
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
