import React, {useMemo, useRef, useState} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';

import {Box, Text, Divider, Button, HeaderInfo} from 'components';
import data from 'constants/data';
import {capitalizeFirstLetter} from 'shared/utils';

import {GiftCard} from './GiftCard';

const CAROUSEL_WIDTH = Dimensions.get('screen').width - 2 * 20;

export const SubGiftCard = ({
  onSnapToItem,
  selectedGiftCard,
  next,
  setSwiperHeight,
  cardSubCategories = [],
}) => {
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
          layout="stack"
          layoutCardOffset={18}
          loop
          renderItem={GiftCard}
          sliderWidth={CAROUSEL_WIDTH}
          itemWidth={CAROUSEL_WIDTH}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          onSnapToItem={onSnapToItem}
        />
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
        text={capitalizeFirstLetter(selectedGiftCard?.name ?? 'Card')}
        onPress={next}
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: colors.black,
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
