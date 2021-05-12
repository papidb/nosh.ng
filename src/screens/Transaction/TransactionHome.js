import React, {useState, useCallback, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import Modal from 'react-native-modal';

import {
  Box,
  Text,
  Loading,
  Divider,
  RaiseAndroid,
  HeaderInfo,
} from 'components';
import {TransactionTab, TransactionModal} from './components';
import {getDataFromPurePages, purgeData, uuid} from 'shared/utils';
import {connect} from 'react-redux';
import {getTrades} from 'action';
import {palette} from 'constants/theme';
import {useNavigation} from '@react-navigation/core';
import {useInfiniteQuery} from 'react-query';
import {useNoshScroller} from 'hooks';

const HeaderComponent = () => {
  return (
    <Box marginBottom="m" marginHorizontal="l">
      <Box marginTop="m" style={styles.header}>
        <HeaderInfo text="GIFTCARD TRANSACTION HISTORY" />
      </Box>
      <Text
        color="success"
        textAlign="right"
        fontWeight="600"
        fontSize={12}
        lineHeight={15.26}
        style={styles.ngn}>
        NGN
        {/* USD */}
      </Text>
      <Divider />
    </Box>
  );
};

const ItemSeparatorComponent = () => (
  <Box marginHorizontal="l" style={{marginBottom: 9}}>
    <Divider />
  </Box>
);

const TransactionScreen = ({getTrades}) => {
  const navigation = useNavigation();
  const {
    data,
    onRefresh,
    status,
    isFetchingNextPage,
    fetchNextPage,
    refreshing,
  } = useNoshScroller(getTrades, 'notificationData', 'trades');

  const _renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <Box marginVertical="m">
        <ActivityIndicator color={palette.blue} />
      </Box>
    );
  }, [isFetchingNextPage]);

  const _handleLoadMore = useCallback(() => {
    if (isFetchingNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, isFetchingNextPage]);

  return (
    <Box flex={1}>
      {/* <Modal isVisible={isModalVisible} onBackdropPress={() => closeModal()}>
        <TransactionModal {...{closeModal}} />
      </Modal> */}
      {/* Header */}
      {status === 'loading' ? (
        <Loading />
      ) : data.length == 0 ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text
            textAlign="center"
            color="primary"
            fontSize={14}
            fontWeight="600">
            {"There's no trades. Use our services more\n😭😭😭"}
          </Text>
        </Box>
      ) : (
        <Box flex={1}>
          <Box style={{paddingTop: 15}}>
            <Divider style={{marginHorizontal: 53}} />
          </Box>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={HeaderComponent}
            data={data}
            keyExtractor={(item, index) => uuid()}
            renderItem={({item}) => (
              <TransactionTab {...item} {...{navigation}} />
            )}
            ListFooterComponent={_renderFooter}
            ItemSeparatorComponent={ItemSeparatorComponent}
            onEndReached={_handleLoadMore}
            onEndReachedThreshold={0.3}
          />
        </Box>
      )}
      <Divider style={[styles.bottomDivider, styles.noMarginTop]} />
      <Text textAlign="center" color="primary" fontSize={11} fontWeight="600">
        CLICK ON TRANSACTION FOR DETAILS
      </Text>
      <Divider style={styles.bottomDivider} />
      <RaiseAndroid height={76} />
    </Box>
  );
};

export const TransactionHome = connect(null, {getTrades})(TransactionScreen);

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
