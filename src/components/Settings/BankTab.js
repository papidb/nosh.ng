import React from 'react';
import {StyleSheet, Image} from 'react-native';

import PropTypes from 'prop-types';

import {Box, Text, Circle} from 'components';
import images from 'constants/images';

export const BankTab = ({accountName = '', accountNumber = ''}) => {
  return (
    <Box flexDirection="row" alignItems="center" justifyContent="space-between">
      {/* Image */}
      <Box>
        <Circle size={50.79} borderWidth={5} style={styles.circle}>
          <Image source={images.kuda} width={27} style={styles.iamge} />
        </Circle>
      </Box>
      <Box>
        <Text color="primary" fontWeight="600" fontSize={12}>
          {accountName} - {accountNumber}
        </Text>
      </Box>
    </Box>
  );
};
BankTab.propTypes = {
  name: PropTypes.string,
  nuban: PropTypes.string,
};

const styles = StyleSheet.create({
  circle: {borderColor: 'rgba(64, 25, 109, 0.15)'},
  image: {width: 27, height: 27},
});
