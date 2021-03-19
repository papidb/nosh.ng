import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';

import {Box, Text, Circle, Select, Button, HeaderInfo, Icon} from 'components';
import {GiftCardBox} from './GiftCardBox';

import {commaFormatter} from 'shared/utils';
import images from 'constants/images';
import data from 'constants/data';
import {palette} from 'constants/theme';

export const SubCategory = ({next, prev}) => {
  const USD_AMOUNT = 1400;
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

        <Image source={images.itunes_2} style={{width: 120, height: 67.5}} />
      </Box>
      <GiftCardBox marginVertical="m">
        <Text fontSize={18} fontWeight="600">
          USA Apple Itunes
        </Text>
      </GiftCardBox>
      <Select
        placeholder={data.cardSub}
        onClose={console.log}
        onValueChange={(string) => console.log({string})}
        items={data.cardsubcategory}
      />
      <Box flexDirection="row" marginVertical="xs">
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

SubCategory.propTypes = {
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
