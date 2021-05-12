/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useStore} from 'react-redux';

import {connect} from 'react-redux';
import {Portal} from 'react-native-portalize';
import {useModalize} from 'hooks';
import FastImage from 'react-native-fast-image';
import {format} from 'date-fns';

import {Withdraw, AddBank} from 'components/Settings';
import {
  uuid,
  purifyStatus,
  commaFormatter,
  getDataFromPagesPure,
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
} from 'components';
import {UserNameSetup, Balance} from 'components/Home';
import {palette} from 'constants/theme';
import images from 'constants/images';
import {
  addBank,
  getBanks,
  getUser,
  verifyAccount,
  getTransactions,
  withdraw,
  deleteBank,
} from 'action';
import {useNavigation} from '@react-navigation/core';
import {useInfiniteQuery} from 'react-query';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Itunes',
    amount: 353,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Google Pay',
    amount: 353,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Nordstrom',
    amount: 353,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Nordstrom',
    amount: 353,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Nordstrom',
    amount: 353,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Nordstrom',
    amount: 353,
  },
];
const Item = (props) => {
  // console.log(props);
  const {title, bankCode, createdAt, status, amount} = props;
  const color = purifyStatus(status);
  let Img = BankMapIcon[bankCode]?.default ?? BankMapIcon['50746']?.default;
  return (
    <Box flexDirection="row" alignItems="center" marginBottom="s">
      {/* Icon */}
      <Box
        backgroundColor="white"
        height={52}
        width={52}
        borderRadius={52}
        marginRight="m"
        borderWidth={3}
        style={styles.circle}
        justifyContent="center"
        alignItems="center">
        <Img style={{width: 30, height: 30}} />
      </Box>
      {/* Text */}
      <Box flex={1}>
        <Text fontSize={14} fontWeight="600" color="white" lineHeight={20.35}>
          Bank withdrawal
        </Text>
        <Text fontSize={11} fontWeight="600" color="success" lineHeight={15.26}>
          {/* April 5 - 2021 */}
          {format(new Date(createdAt), 'MMMM d - yyyy')}
        </Text>
      </Box>
      {/* Amount */}
      <Text
        fontWeight="600"
        fontSize={16}
        lineHeight={22.9}
        marginRight="l"
        {...{color}}>
        {commaFormatter(amount)}
      </Text>
    </Box>
  );
};

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
}) => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const banks = user?.wallet?.banks ?? [];
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
  const getData = ({pageParam = 0}) => getTransactions(pageParam);
  const {
    error,
    data: pureData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('transactionData', getData, {
    getNextPageParam: (lastPage, pages) => {
      // eslint-disable-next-line eqeqeq
      if (lastPage?.currentPage == lastPage?.totalPages) {
        return undefined;
      }
      return lastPage?.currentPage;
    },
    staleTime: 0,
    cacheTime: 0,
  });
  const goToFirst = () => fetchNextPage({pageParam: 0});

  const getDataFromPages = useCallback((pages = [], key = 'transactions') => {
    return getDataFromPagesPure(pages, key);
  }, []);
  const {pages} = pureData || {};
  const data = getDataFromPages(pages);

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

  console.log({status});
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
            {...{withdraw, banks, thereIsBank}}
          />
        </WithdrawModalize>
      </Portal>
      {status === 'loading' && <Loading />}
      {status === 'error' && (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text textAlign="center" color="white" fontWeight="600">
            Something went wrong!!!
          </Text>
          <Box marginVertical="l" alignSelf="stretch">
            <Button
              color="error"
              onPress={goToFirst}
              text="Retry"
              // loading={status == 'loading'}
              loading={isFetching}
            />
          </Box>
        </Box>
      )}
      {status === 'success' &&
        (data.length === 0 ? (
          <Box flex={1} alignItems="center" justifyContent="center">
            <Text
              textAlign="center"
              color="primary"
              fontSize={14}
              fontWeight="600">
              {'There are no transactions. Use our services more\n😭😭😭'}
            </Text>
          </Box>
        ) : (
          <FlatList
            data={data}
            ListHeaderComponent={ScreenHeader}
            renderItem={({item}) => <Item {...item} />}
            keyExtractor={() => uuid()}
            ItemSeparatorComponent={() => (
              <Divider style={{marginHorizontal: 35, marginBottom: 8}} />
            )}
            ListFooterComponent={_renderFooter}
            onEndReached={_handleLoadMore}
            onEndReachedThreshold={0.1}
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
