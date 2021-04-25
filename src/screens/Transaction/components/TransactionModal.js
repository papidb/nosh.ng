import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import PropTypes from 'prop-types';

import {Box, Text, Divider, Close, Circle} from 'components';
import FastImage from 'react-native-fast-image';
import {capitalizeFirstLetter, uuid, commaFormatter} from 'shared/utils';

import {format} from 'date-fns';

const renderItem = (path) => {
  return (
    <Circle size={75} key={uuid()} marginRight="xs">
      <FastImage
        source={{
          uri: path,
          priority: FastImage.priority.high,
        }}
        style={{
          width: 75,
          height: 75,
          borderRadius: 75,
          // resizeMode: 'contain',
        }}
      />
    </Circle>
  );
};
export const TransactionModal = ({
  closeModal = () => {},
  cardCategory,
  cardTotalAmount,
  status,
  color,
  createdAt,
  comment,
  tradeFiles = [],
  tradeStatus,
}) => {
  // const rejectionReason = tradeStatus?.rejectionReason;
  const rejectionReason = 'Omo we don tire for your matter';

  console.log({rejectionReason});

  return (
    <Box flex={1} paddingBottom="l">
      {/* <Box flex={1} /> */}
      <Box
        backgroundColor="white"
        borderRadius={38}
        padding="l"
        position="relative"
        paddingTop="none">
        {/* Content */}
        <Box position="absolute" zIndex={20390} top={20} right={15}>
          <Close onPress={closeModal} />
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          marginBottom="s"
          marginTop="l">
          <FastImage
            source={{
              uri: cardCategory.avatar,
              priority: FastImage.priority.high,
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: 97,
              height: 55,
            }}
          />
          <Text color="primary" fontSize={13} fontWeight="600">
            Status:{' '}
          </Text>
          <Text color="primary" fontSize={13} fontWeight="600" {...{color}}>
            {capitalizeFirstLetter(status)}
          </Text>
        </Box>

        <Box>
          {tradeFiles.length > 0 && (
            <ScrollView
              nestedScrollEnabled
              horizontal
              // contentContainerStyle={{overflow: 'hidden'}}
              //
            >
              {tradeFiles.map((item) => {
                return renderItem(item);
              })}
            </ScrollView>
          )}
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
                {cardCategory?.name}
              </Text>
              {/* <Text color="success" fontSize={16} fontWeight="600">
                x 4cards
              </Text> */}
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
                {cardTotalAmount}
              </Text>
              <Text color="success" fontSize={24}>
                {commaFormatter(cardTotalAmount)}
              </Text>
            </Box>
            <Box marginHorizontal="l">
              <Text
                color="success"
                fontSize={12}
                fontWeight="600"
                textAlign="right">
                NGN
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
              <Text color="success" fontSize={12} fontWeight="600">
                {format(new Date(createdAt), 'MMMM d - yyyy')}
              </Text>
              <Text color="success" fontSize={12} fontWeight="600">
                {format(new Date(createdAt), 'H:mmbbb')}
              </Text>
            </Box>
            <Divider style={styles.headerDivider} />
          </Box>
          <Box>
            <Box
              marginTop="l"
              justifyContent="flex-end"
              marginBottom="s"
              marginHorizontal="l"
              //
            >
              <Text
                fontSize={14}
                textAlign="left"
                marginBottom="m"
                fontWeight="600"
                style={{color: !!rejectionReason ? '#525C6B' : '#D3D3D3'}}>
                {/* {!!comment ? comment : 'No Optional comments'} */}
                Rejection Reason
              </Text>
              <Text fontSize={12} textAlign="left" style={{color: '#D3D3D3'}}>
                {/* {!!comment ? comment : 'No Optional comments'} */}
                {rejectionReason}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <Box flex={1} /> */}
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
