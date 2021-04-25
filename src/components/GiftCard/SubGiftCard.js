import React, {useMemo, useRef, useState} from 'react';
import {
  ScrollView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

// import Carousel from 'react-native-snap-carousel';

import {Box, Text, Icon, Divider, Button, HeaderInfo} from 'components';
import data from 'constants/data';
import {capitalizeFirstLetter} from 'shared/utils';
import Carousel, {getInputRangeFromIndexes} from 'react-native-snap-carousel';

import {GiftCard} from './GiftCard';

const CAROUSEL_WIDTH = Dimensions.get('screen').width - 2 * 20;
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
  const selectedGiftCard = useMemo(() => cardSubCategories[index] || {}, [
    cardSubCategories,
    index,
  ]);
  const _scrollInterpolator = (index, carouselProps) => {
    const range = [3, 2, 1, 0, -1];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;

    return {inputRange, outputRange};
  };

  const _animatedStyles = (index, animatedValue, carouselProps, cardOffset) => {
    const sizeRef = carouselProps.vertical
      ? carouselProps.itemHeight
      : carouselProps.itemWidth;
    const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';

    const card1Scale = 0.9;
    const card2Scale = 0.8;

    cardOffset = !cardOffset && cardOffset !== 0 ? 18 : cardOffset;

    const getTranslateFromScale = (cardIndex, scale) => {
      const centerFactor = (1 / scale) * cardIndex;
      const centeredPosition = -Math.round(sizeRef * centerFactor);
      const edgeAlignment = Math.round((sizeRef - sizeRef * scale) / 2);
      const offset = Math.round((cardOffset * Math.abs(cardIndex)) / scale);

      return IS_ANDROID
        ? centeredPosition - edgeAlignment - offset
        : centeredPosition + edgeAlignment + offset;
    };

    const opacityOutputRange =
      carouselProps.inactiveSlideOpacity === 1
        ? [1, 1, 1, 0]
        : [1, 0.75, 0.5, 0];
    return IS_ANDROID
      ? {
          // elevation: carouselProps.data.length - index, // fix zIndex bug visually, but not from a logic point of view
          opacity: animatedValue.interpolate({
            inputRange: [-3, -2, -1, 0],
            outputRange: opacityOutputRange.reverse(),
            extrapolate: 'clamp',
          }),
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [-2, -1, 0, 1],
                outputRange: [card2Scale, card1Scale, 1, card1Scale],
                extrapolate: 'clamp',
              }),
            },
            {
              [translateProp]: animatedValue.interpolate({
                inputRange: [-3, -2, -1, 0, 1],
                outputRange: [
                  getTranslateFromScale(-3, card2Scale),
                  getTranslateFromScale(-2, card2Scale),
                  getTranslateFromScale(-1, card1Scale),
                  0,
                  sizeRef * 0.5,
                ],
                extrapolate: 'clamp',
              }),
            },
          ],
        }
      : {
          zIndex: carouselProps.data.length - index,
          opacity: animatedValue.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: opacityOutputRange,
            extrapolate: 'clamp',
          }),
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [-1, 0, 1, 2],
                outputRange: [card1Scale, 1, card1Scale, card2Scale],
                extrapolate: 'clamp',
              }),
            },
            {
              [translateProp]: animatedValue.interpolate({
                inputRange: [-1, 0, 1, 2, 3],
                outputRange: [
                  -sizeRef * 0.5,
                  0,
                  getTranslateFromScale(1, card1Scale),
                  getTranslateFromScale(2, card2Scale),
                  getTranslateFromScale(3, card2Scale),
                ],
                extrapolate: 'clamp',
              }),
            },
          ],
        };
  };
  // console.log({selectedGiftCard});
  return (
    <Box overflow="hidden">
      <HeaderInfo text="SWIPE THROUGH TO SELECT CATEGORY" />
      <Box
        height={225}
        alignItems="center"
        marginVertical={{bigScreen: 'xl', phone: 'l'}}>
        <Carousel
          data={cardSubCategories}
          // layout="stack"
          // removeClippedSubviews={false}
          useScrollView={true}
          layoutCardOffset={'9'}
          loop
          scrollInterpolator={_scrollInterpolator}
          slideInterpolatedStyle={_animatedStyles}
          renderItem={GiftCard}
          sliderWidth={CAROUSEL_WIDTH}
          itemWidth={CAROUSEL_WIDTH}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          onSnapToItem={(slideIndex) => {
            // onSnapToItem(slideIndex);
            setIndex(slideIndex);
            setSelected(cardSubCategories[slideIndex]);
          }}
        />
      </Box>
      <Text
        color="primary"
        fontWeight="600"
        textAlign="center"
        fontSize={12}
        style={styles.clickHere}>
        CLICK HERE TO BEGIN
      </Text>

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
            <Text color="primary" fontWeight="600" fontSize={14}>
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
