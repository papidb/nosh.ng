/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useStore} from 'react-redux';

import {connect} from 'react-redux';
import {Portal} from 'react-native-portalize';
import {useModalize, useNoshScroller} from 'hooks';
import FastImage from 'react-native-fast-image';
import {format} from 'date-fns';

import {Withdraw, AddBank} from 'components/Settings';
import {
  uuid,
  purifyStatus,
  commaFormatter,
  getDataFromPurePages,
} from 'shared/utils';
import {
  Box,
  Text,
  BankMapIcon,
  Divider,
  HeaderInfo,
  Loading,
  Icon,
  Header,
  Button,
  SWW,
  EmptyScreen,
} from 'components';
import {UserNameSetup, Balance} from 'components/Home';
import {palette} from 'constants/theme';
import images from 'constants/images';
import {
  addBank,
  getBanks,
  getUser,
  getSettings,
  verifyAccount,
  getTransactions,
  withdraw,
  deleteBank,
} from 'action';
import {useNavigation} from '@react-navigation/core';
import {useInfiniteQuery} from 'react-query';
import {WithdrawalItem} from './WithdrawalItem';
import {selectBanks} from 'selectors';

const ScreenHeader = () => {
  return (
    <Box>
      <Divider />
      <Box position="relative">
        <Balance
          {...{
            containerProps: {style: {marginTop: 16, marginBottom: 8}},
          }}
        />
      </Box>

      <Box marginBottom="m">
        <HeaderInfo text="NOSH WALLET" />
      </Box>
      <Box marginBottom="xs">
        <Text
          color="success"
          textAlign="right"
          fontWeight="600"
          fontSize={12}
          lineHeight={15.26}
          style={styles.ngn}>
          NGN
        </Text>
        <Divider />
      </Box>
    </Box>
  );
};

export const WalletScreen = ({
  addBank,
  getBanks,
  verifyAccount,
  getUser,
  deleteBank,
  withdraw,
  getTransactions,
  getSettings,
}) => {
  const navigation = useNavigation();
  const banks = useSelector(selectBanks);
  const thereIsBank = banks.length > 0;
  const {
    openModal: openAddBank,
    closeModal: closeAddBankModal,
    Component: AddBankModalize,
  } = useModalize();
  const {
    openModal: openWithdraw,
    closeModal: closeWithdrawModal,
    Component: WithdrawModalize,
  } = useModalize();
  const AddBankC = useCallback(
    () => (
      <AddBank
        close={closeAddBankModal}
        {...{addBank, getUser, deleteBank, getBanks, verifyAccount}}
      />
    ),
    [addBank, closeAddBankModal, getBanks, getUser, deleteBank, verifyAccount],
  );
  const {
    data,
    onRefresh,
    status,
    isFetchingNextPage,
    fetchNextPage,
    refreshing,
    goToFirst,
    isFetching,
  } = useNoshScroller(getTransactions, 'transactionData', 'transactions');

  const _renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <Box marginVertical="m">
        <ActivityIndicator color={palette.blue} />
      </Box>
    );
  }, [isFetchingNextPage]);

  const _handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  // console.log({status});
  return (
    <Box flex={1} paddingHorizontal="l">
      <Portal>
        <AddBankModalize>
          {/* <AddBankC /> */}
          <AddBankC />
        </AddBankModalize>
        <WithdrawModalize>
          <Withdraw
            close={closeWithdrawModal}
            {...{withdraw, banks, thereIsBank, getSettings}}
          />
        </WithdrawModalize>
      </Portal>
      {status === 'loading' && <Loading />}
      {status === 'error' && <SWW {...{goToFirst, isFetching}} />}
      {status === 'success' &&
        (data.length === 0 ? (
          <EmptyScreen
            text={'There are no transactions. Use our services more\n😭😭😭'}
          />
        ) : (
          <FlatList
            data={data}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={ScreenHeader}
            renderItem={({item}) => <WithdrawalItem {...item} />}
            keyExtractor={() => uuid()}
            ItemSeparatorComponent={() => (
              <Divider style={{marginHorizontal: 35, marginBottom: 8}} />
            )}
            ListFooterComponent={_renderFooter}
            onEndReached={_handleLoadMore}
            onEndReachedThreshold={0.3}
          />
        ))}

      <Box flexDirection="row">
        <TouchableOpacity
          onPress={openWithdraw}
          style={{
            flex: 3,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(48,188,237,0.1)',
            borderRadius: 100,
            flexDirection: 'row',
            marginRight: 10,
          }}>
          <Icon name="icon-send" size={25} style={{left: 0}} />
          <Text
            color="primary"
            fontWeight="600"
            fontSize={11}
            style={{marginLeft: 19}}>
            WITHDRAW FUNDS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openAddBank}
          style={{
            flex: 2,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(61,170,157,0.1)',
            borderRadius: 100,
            flexDirection: 'row',
            marginRight: 10,
          }}>
          <Text color="white" fontWeight="600" fontSize={11}>
            + ADD BANK
          </Text>
        </TouchableOpacity>
      </Box>
      <Box height={100} />
    </Box>
  );
};
export const Wallet = connect(null, {
  addBank,
  getBanks,
  getUser,
  getSettings,
  withdraw,
  verifyAccount,
  getTransactions,
  deleteBank,
})(WalletScreen);

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
  circle: {borderColor: 'rgba(48,188,237,0.15)'},
  image: {width: 27, height: 27},
});
