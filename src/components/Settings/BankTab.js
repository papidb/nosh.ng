import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

import PropTypes from 'prop-types';

import {Box, Text, Circle} from 'components';
import images from 'constants/images';
import {palette} from 'constants/theme';

export const BankTab = ({
  accountName = '',
  accountNumber = '',
  selected = null,
  _id,
  setSelected,
}) => {
  // const isSelected = setSelected(_id);
  const isSelected = selected === _id;
  const onPress = () => setSelected(_id);
  return (
    <TouchableOpacity onPress={onPress}>
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
              isSelected
                ? {borderColor: palette.blue}
                : {borderColor: '#D8D8D8'},
            ]}>
            <Image source={images.kuda} width={27} style={styles.iamge} />
          </Circle>
        </Box>
        <Box>
          <Text color="primary" fontWeight="600" fontSize={12}>
            {accountName} - {accountNumber}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
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
