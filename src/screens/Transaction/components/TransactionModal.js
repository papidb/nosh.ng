import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

import PropTypes from 'prop-types';

import {Box, Text, Divider, Close, Circle} from 'components';
import images from 'constants/images';

export const TransactionModal = ({closeModal = () => {}}) => {
  return (
    <Box backgroundColor="white" borderRadius={38} padding="l">
      <Close onPress={closeModal} />
      {/* Content */}
      <Box alignItems="center" marginBottom="s" marginTop="l">
        <Image source={images.itunes_2} />
      </Box>

      <Box>
        <Box>
          <Divider
            marginBottom="l"
            marginTop="m"
            style={styles.headerDivider}
          />
          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginBottom="s"
            marginHorizontal="l"
            alignItems="center">
            <Text color="text" fontSize={16} fontWeight="600">
              USA Apple Itunes
            </Text>
            <Text color="success" fontSize={16} fontWeight="600">
              x 4cards
            </Text>
          </Box>

          <Divider marginTop="m" style={styles.headerDivider} />
        </Box>
        <Box>
          <Box
            marginTop="l"
            flexDirection="row"
            justifyContent="space-between"
            marginBottom="s"
            marginHorizontal="l"
            alignItems="center">
            <Text color="primary" fontSize={24}>
              2,000.00
            </Text>
            <Text color="primary" fontSize={12} fontWeight="600">
              USD
            </Text>
          </Box>

          <Divider marginTop="m" style={styles.headerDivider} />
        </Box>
        <Box>
          <Box
            marginTop="l"
            flexDirection="row"
            justifyContent="space-between"
            marginBottom="s"
            marginHorizontal="l"
            alignItems="center">
            <Text color="success" fontSize={24}>
              560,000.00
            </Text>
            <Text color="success" fontSize={12} fontWeight="600">
              USD
            </Text>
          </Box>
        </Box>
        <Box>
          <Box
            marginTop="l"
            flexDirection="row"
            justifyContent="space-between"
            marginBottom="s"
            marginHorizontal="l"
            alignItems="center">
            <Text color="success" fontSize={12} fontWeight="600">
              April 5 - 2021
            </Text>
            <Text color="success" fontSize={12} fontWeight="600">
              10:36am
            </Text>
          </Box>
        </Box>
        <Box>
          <Box
            marginTop="l"
            justifyContent="flex-end"
            marginBottom="s"
            marginHorizontal="l"
            //
          >
            <Text color="primary" fontSize={13} textAlign="right">
              No Optional comments
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  scrollView: {flex: 1, paddingHorizontal: 20},
  header: {
    marginBottom: 15,
  },
  ngn: {marginRight: 35, marginBottom: 9},
  noMarginTop: {
    marginTop: 0,
  },
  headerDivider: {
    marginHorizontal: 14,
  },
  bottomDivider: {
    marginVertical: 19,
    marginHorizontal: 35,
  },
});
TransactionModal.propTypes = {
  closeModal: PropTypes.func,
};
