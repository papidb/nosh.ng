import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

import PropTypes from 'prop-types';

import {Box, Close, BankMapIcon, Text, Circle} from 'components';
import images from 'constants/images';
import {palette} from 'constants/theme';

export const BankTab = ({
  accountName = '',
  accountNumber = '',
  selected = null,
  _id,
  setSelected,
  bankCode,
  deletable,
  deleteFn = () => {},
}) => {
  let Img = BankMapIcon[bankCode]?.default ?? BankMapIcon['50746']?.default;

  // const isSelected = setSelected(_id);
  const touchable = !!setSelected && typeof setSelected === 'function';
  const isSelected = selected === _id;
  const onPress = () => setSelected(_id);
  const Content = (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      marginBottom="xs">
      {/* Image */}
      <Box>
        <Circle
          size={50.79}
          borderWidth={5}
          style={[
            styles.circle,
            isSelected ? {borderColor: palette.blue} : {borderColor: '#D8D8D8'},
          ]}>
          <Img style={{width: 30, height: 30}} />
        </Circle>
      </Box>
      <Box>
        <Text color="primary" fontWeight="600" fontSize={12}>
          {accountName} - {accountNumber}
        </Text>
      </Box>
      {deletable && (
        <Box>
          <Close
            onPress={deleteFn}
            circleProps={{
              size: 29,
              borderWidth: 3,
              borderColor: 'selectIconBlue',
            }}
            closeProps={{style: {width: 9, height: 9}}}
          />
        </Box>
      )}
    </Box>
  );

  return !touchable ? (
    Content
  ) : (
    <TouchableOpacity onPress={onPress}>{Content}</TouchableOpacity>
  );
};
BankTab.propTypes = {
  name: PropTypes.string,
  nuban: PropTypes.string,
};

const styles = StyleSheet.create({
  // circle: {borderColor: '#D8D8D8'},
  image: {width: 27, height: 27},
});
