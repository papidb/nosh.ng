import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import {Box, Text, Divider, Icon, HeaderInfo} from 'components';
import {uuid} from 'shared/utils';

const TransactionTab = () => {
  return (
    <TouchableOpacity>
      <Box flexDirection="row" alignItems="center" marginBottom="s">
        {/* Icon */}
        <Box
          backgroundColor="white"
          height={52}
          width={52}
          borderRadius={52}
          marginRight="m"
          justifyContent="center"
          alignItems="center">
          <Icon name="icon-apple" />
        </Box>
        {/* Text */}
        <Box flex={1}>
          <Text fontSize={16} fontWeight="bold" color="text" lineHeight={20.35}>
            USA Apple Itunes
          </Text>
          <Text
            fontSize={12}
            fontWeight="bold"
            color="success"
            lineHeight={15.26}>
            April 5 - 2021
          </Text>
        </Box>
        {/* Amount */}
        <Text
          fontWeight="bold"
          fontSize={18}
          color="success"
          lineHeight={22.9}
          marginRight="l">
          560,000
        </Text>
      </Box>
      <Divider marginBottom="s" />
    </TouchableOpacity>
  );
};

export const TransactionHome = () => {
  return (
    <Box flex={1}>
      <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
        {/* Header */}
        <Box marginBottom="m">
          <Divider />
          <Box marginTop="l" style={styles.header}>
            <HeaderInfo text="GIFTCARD TRANSACTION HISTORY" />
          </Box>
          <Text
            color="success"
            textAlign="right"
            fontWeight="bold"
            fontSize={12}
            lineHeight={15.26}
            style={styles.ngn}>
            NGN
          </Text>
          <Divider />
        </Box>
        {Array.from(Array(20)).map(() => {
          return <TransactionTab key={uuid()} />;
        })}
      </ScrollView>
      <Divider style={[styles.bottomDivider, styles.noMarginTop]} />
      <Text textAlign="center" color="primary" fontSize={12} fontWeight="bold">
        CLICK ON TRANSACTION FOR DETAILS
      </Text>
      <Divider style={styles.bottomDivider} />
    </Box>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 15,
  },
  ngn: {marginRight: 35, marginBottom: 9},
  noMarginTop: {
    marginTop: 0,
  },
  bottomDivider: {
    marginVertical: 19,
    marginHorizontal: 35,
  },
});
