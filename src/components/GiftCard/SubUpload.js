import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Box, Text, Circle, Button, HeaderInfo, Icon} from 'components';
import {GiftCardBox} from './GiftCardBox';

import images from 'constants/images';
import {capitalizeFirstLetter} from 'shared/utils';
import FastImage from 'react-native-fast-image';

export const SubUpload = ({next, prev, data: giftCard, setSwiperHeight}) => {
  const imageUri = `https://api.nosh.ng/uploads/images/cards/${giftCard.title}.png`;

  // const USD_AMOUNT = 1400;
  return (
    <Box
      onLayout={({
        nativeEvent: {
          layout: {height},
        },
      }) => {
        setSwiperHeight(height);
      }}>
      <KeyboardAwareScrollView>
        <HeaderInfo text="UPLOAD GIFTCARD (S)" />
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
            {capitalizeFirstLetter(giftCard?.displayName)}
          </Text>
        </GiftCardBox>
        <TouchableOpacity>
          <GiftCardBox marginVertical="m" padding="none">
            <Text fontSize={18} fontWeight="600">
              <Icon name="icon-cart" size={43.2} />
            </Text>
          </GiftCardBox>
          <Text
            color="primary"
            fontSize={12}
            fontWeight="bold"
            textAlign="center"
            marginVertical="xs">
            CLICK HERE TO UPLOAD CARD
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <GiftCardBox
            marginVertical="m"
            flexDirection="row"
            height={38}
            padding="none"
            paddingHorizontal="xl"
            justifyContent="space-between">
            <Icon name="icon-edit_colored" size={25} />
            <Text color="success" fontSize={13}>
              + Add Optional comments
            </Text>
          </GiftCardBox>
        </TouchableOpacity>

        {/* Button */}
        <Button
          variant="giftcard"
          text="SWIPE TO SELL"
          //   onPress={() => next()}
        />
      </KeyboardAwareScrollView>
    </Box>
  );
};
const styles = StyleSheet.create({
  image: {width: 120, height: 67.5},
});

SubUpload.propTypes = {
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
