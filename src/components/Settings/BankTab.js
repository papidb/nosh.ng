import React from 'react';
import {StyleSheet, Image} from 'react-native';

import PropTypes from 'prop-types';

import {Box, Text, Circle} from 'components';
import images from 'constants/images';

export const BankTab = ({name = 'NNAMDI AYOOLA', nuban = '0289387823'}) => {
  return (
    <Box flexDirection="row" alignItems="center" justifyContent="space-between">
      {/* Image */}
      <Box>
        <Circle size={50.79} borderWidth={5} style={styles.circle}>
          <Image source={images.kuda} width={27} style={styles.iamge} />
        </Circle>
      </Box>
      <Box>
        <Text color="primary" fontWeight="bold" fontSize={12}>
          {name} - {nuban}
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
