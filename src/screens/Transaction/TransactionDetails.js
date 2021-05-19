import React, {useState, useCallback, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';

import {
  Box,
  Text,
  SvgIcon,
  Close,
  Divider,
  RaiseAndroid,
  Circle,
} from 'components';
import {purifyStatus} from 'shared/utils';
import {connect} from 'react-redux';
import {getTrades} from 'action';
import {palette} from 'constants/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core';
import {capitalizeFirstLetter, uuid, commaFormatter} from 'shared/utils';
import FastImage from 'react-native-fast-image';
import Lightbox from 'react-native-lightbox-v2';

import {format} from 'date-fns';

const renderItem = ({path, top}) => {
  const renderContent = React.useCallback(() => {
    return (
      <FastImage
        source={{
          uri: path,
          priority: FastImage.priority.high,
        }}
        style={{
          // width: '75',
          height: '75%',
          // borderRadius: 75,
          // resizeMode: 'contain',
        }}
      />
    );
  }, [path]);
  return (
    <Circle size={75} key={uuid()} marginRight="xs">
      <Lightbox
        underlayColor="transparent"
        renderContent={renderContent}
        renderHeader={(close) => (
          <Box style={{marginTop: top * 0.75}}>
            <Close
              onPress={close}
              circleProps={{style: {marginTop: 16, marginRight: 16}}}
              Icon={SvgIcon.CloseIconLight}
            />
          </Box>
        )}>
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
      </Lightbox>
    </Circle>
  );
};
const TransactionScreen = ({getTrades, route: {params}}) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  const goBack = () => navigation?.goBack();
  const {
    amountPayable,
    cardTotalAmount,
    createdAt,
    tradeStatus,
    cardCategory,
    comment,
    tradeFiles = [],
    tradeRef,
    cardSubCategory,
    ...props
  } = params;

  // console.log({props})
  const copyTransactionRef = () => Clipboard.setString(tradeRef);
  // console.log({props});
  const status = tradeStatus?.status ?? 'pending';
  const avatar = tradeStatus?.avatar ?? null;
  const color = purifyStatus(status);
  console.log({tradeRef});
  const rejectionReason = tradeStatus?.rejectionReason;
  return (
    <Box flex={1} style={{paddingTop: top}}>
      <Close
        onPress={goBack}
        circleProps={{style: {marginTop: 16, marginRight: 16}}}
        Icon={SvgIcon.CloseIconLight}
      />
      {/* <Modal isVisible={isModalVisible} onBackdropPress={() => closeModal()}>
        <TransactionModal {...{closeModal}} />
      </Modal> */}
      {/* Header */}
      <ScrollView style={styles.scrollView}>
        <Box
          flexDirection="row"
          alignItems="center"
          marginBottom="s"
          marginTop="l"
          justifyContent="space-between">
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
          <Box flexDirection="row">
            <Text color="primary" fontSize={13} fontWeight="600">
              Status:{' '}
            </Text>
            <Text color="primary" fontSize={13} fontWeight="600" {...{color}}>
              {capitalizeFirstLetter(status)}
            </Text>
          </Box>
        </Box>

        <Box>
          <Box marginTop="xl">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              marginBottom="xxs"
              marginHorizontal="l"
              alignItems="center">
              <Text fontSize={14} color="white" fontWeight="600">
                Transaction ID:
              </Text>
              <TouchableOpacity onPress={copyTransactionRef}>
                <Text color="success" fontWeight="600">
                  {tradeRef}
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
          {tradeFiles.length > 0 && (
            <>
              <Divider
                marginTop="m"
                marginBottom="m"
                style={styles.headerDivider}
              />
              <Box marginLeft="m">
                <ScrollView
                  nestedScrollEnabled
                  horizontal
                  // contentContainerStyle={{overflow: 'hidden'}}
                  //
                >
                  {tradeFiles.map((item) => {
                    return renderItem({path: item, top});
                  })}
                </ScrollView>
                <Text fontSize={13} color="success" marginTop="m">
                  Click image to expand
                </Text>
              </Box>
            </>
          )}

          <Box>
            <Divider
              marginBottom="l"
              marginTop="m"
              style={styles.headerDivider}
            />
            <Box
              // flexDirection="row"
              justifyContent="space-between"
              marginBottom="s"
              marginHorizontal="l"
              // alignItems="center"
            >
              <Text
                color="white"
                fontSize={13}
                fontWeight="600"
                marginBottom="xs">
                {cardCategory?.name}
              </Text>
              <Text color="primary" fontSize={14} fontWeight="600">
                {cardSubCategory?.name}
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
                {commaFormatter(cardTotalAmount)}
              </Text>
              <Text color="success" fontSize={24} textAlign="right">
                {commaFormatter(amountPayable)}
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
          {!!comment && (
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
                  style={{color: '#D3D3D3'}}>
                  Optional comments
                </Text>
                <Text fontSize={12} textAlign="left" style={{color: '#D3D3D3'}}>
                  {comment}
                </Text>
              </Box>
              <Divider style={styles.headerDivider} />
            </Box>
          )}
          {!!avatar && (
            <>
              <Box marginLeft="m">
                {renderItem({path: avatar, top})}
                <Text fontSize={13} color="success" marginTop="m">
                  Click rejection image to expand
                </Text>
              </Box>
              <Divider
                marginTop="m"
                marginBottom="m"
                style={styles.headerDivider}
              />
            </>
          )}
          <Box>
            {!!rejectionReason && (
              <Box
                marginTop="l"
                justifyContent="flex-end"
                marginBottom="s"
                marginHorizontal="l">
                <Text
                  fontSize={14}
                  textAlign="left"
                  marginBottom="m"
                  fontWeight="600"
                  style={{color: '#525C6B'}}>
                  Rejection Reason
                </Text>
                <Text fontSize={12} textAlign="left" style={{color: '#D3D3D3'}}>
                  {rejectionReason}
                </Text>
              </Box>
            )}
          </Box>
        </Box>
        <RaiseAndroid height={100} />
      </ScrollView>
    </Box>
  );
};

export const TransactionDetails = connect(null, {getTrades})(TransactionScreen);

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
    marginVertical: 16,
    marginHorizontal: 35,
  },
});
