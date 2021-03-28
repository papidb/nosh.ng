import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import {Box, Text, Circle, Select, Button, HeaderInfo, Icon} from 'components';
import {GiftCardBox} from './GiftCardBox';

import images from 'constants/images';
import data from 'constants/data';
import {capitalizeFirstLetter} from 'shared/utils';

export const SubCategory = ({next, prev, data: giftCard}) => {
  // const USD_AMOUNT = 1400;
  const imageUri = `https://api.nosh.ng/uploads/images/cards/${giftCard.title}.png`;

  return (
    <Box>
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
          {capitalizeFirstLetter(giftCard?.displayName)}
        </Text>
      </GiftCardBox>
      <Select
        placeholder={data.cardSub}
        onClose={console.log}
        onValueChange={(string) => console.log({string})}
        items={data.cardsubcategory}
      />
      <Box flexDirection="row" marginVertical="xs" marginTop="xxl">
        <Box flex={1} />
        <Box
          flex={1}
          backgroundColor="lightSuccess"
          borderRadius={100}
          padding="l"
          justifyContent="center"
          flexDirection="row"
          alignItems="center">
          <Text fontSize={14} color="buttonColor" fontWeight="700">
            Hottest{' '}
          </Text>
          <Text fontSize={14} color="buttonColor">
            Cards
          </Text>
        </Box>
      </Box>

      {/* Button */}
      <Button variant="giftcard" text="Continue" onPress={() => next()} />
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
