import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/core';
import Swiper from 'react-native-swiper';

import {Box, Text, Divider, Button, HeaderInfo, Icon} from 'components';
import {SubCategory} from 'components/GiftCard';
import images from 'constants/images';

export const GiftCard = () => {
  let [sliderIndex, setSliderIndex] = useState(0);

  let navigation = useNavigation();
  let toSubCategory = () => navigation.navigate('SubCategory');
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
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        {/* Content */}

        <Swiper
          ref={swiperRef}
          style={styles.wrapper}
          showsButtons={false}
          showsPagination={false}
          scrollEnabled={__DEV__}
          // style={{height: 250}}
          //
        >
          <Box>
            <HeaderInfo text="SWIPE THROUGH TO SELECT CATEGORY" />
            <Box
              height={100}
              alignItems="center"
              marginVertical={{bigScreen: 'xxl', phone: 'xl'}}>
              <Box>
                <Text>Cards</Text>
              </Box>
            </Box>

            <Text
              color="primary"
              fontWeight="600"
              textAlign="center"
              fontSize={12}
              marginBottom="m">
              CLICK HERE TO BEGIN
            </Text>

            <Button
              variant="giftcard"
              text="Ebay"
              onPress={() => goToNextSlide()}
            />
          </Box>
          <SubCategory next={goToNextSlide} prev={goBack} />
          <Box style={[styles.slide]}>
            <Text style={styles.text}>And simple</Text>
          </Box>
        </Swiper>
      </ScrollView>
      <Box paddingHorizontal="l" marginBottom="l">
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
    </Box>
  );
};
const styles = StyleSheet.create({
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
