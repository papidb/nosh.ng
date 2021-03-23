import React, {useRef} from 'react';
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
import {SubCategory, SubUpload, SubAmount} from 'components/GiftCard';
import data from 'constants/data';

import {RenderItem} from './RenderItem';

export const GiftCard = () => {
  // let [sliderIndex, setSliderIndex] = useState(0);

  let navigation = useNavigation();
  // let toSubCategory = () => navigation.navigate('SubCategory');
  let swiperRef = useRef();
  const goToNextSlide = () => {
    swiperRef.current?.scrollBy(1);
  };
  const goBack = () => {
    swiperRef.current?.scrollBy(-1);
  };
  const CAROUSEL_WIDTH = Dimensions.get('screen').width - 2 * 20;
  return (
    <Box flex={1}>
      <Divider marginBottom="l" />
      <ScrollView style={giftcardStyles.scrollView}>
        {/* Header */}
        {/* Content */}

        <Box
          height={250}
          alignItems="center"
          marginVertical={{bigScreen: 'xxl', phone: 'xl'}}>
          <Carousel
            // ref={(c) => { this._carousel = c; }}
            data={data.giftCards}
            layout="stack"
            loop
            renderItem={RenderItem}
            sliderWidth={CAROUSEL_WIDTH}
            itemWidth={CAROUSEL_WIDTH}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
          />
        </Box>
        <Swiper
          ref={swiperRef}
          style={giftcardStyles.wrapper}
          showsButtons={false}
          showsPagination={false}
          scrollEnabled={false}
          // style={{height: 250}}
          //
        >
          <Box>
            <HeaderInfo text="SWIPE THROUGH TO SELECT CATEGORY" />

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
          <SubAmount next={goToNextSlide} prev={goBack} />
          <SubUpload next={goToNextSlide} prev={goBack} />
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background1,
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
    backgroundColor: colors.black,
  },
  exampleContainerLight: {
    backgroundColor: 'white',
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleDark: {
    color: colors.black,
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
    marginTop: 15,
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
