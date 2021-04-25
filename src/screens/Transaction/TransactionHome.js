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
import {uuid} from 'shared/utils';
import {connect} from 'react-redux';
import {getTrades} from 'action';
import {palette} from 'constants/theme';

const HeaderComponent = () => {
  return (
    <Box marginBottom="m" marginHorizontal="l">
      <Divider />
      <Box marginTop="l" style={styles.header}>
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
  const [isModalVisible, setModalVisible] = useState(false);

  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pure, setPure] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [max, setMax] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const _renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    return (
      <Box marginVertical="m">
        <ActivityIndicator color={palette.blue} />
      </Box>
    );
  }, [loadingMore]);

  const _handleLoadMore = useCallback(async () => {
    try {
      if (max) return;
      setLoadingMore(true);

      await getTrades(currentPage).then((data) => {
        const {
          // eslint-disable-next-line no-shadow
          currentPage,
          trades,
          // totaltrades,
          totalPages,
        } = data;
        setMax(currentPage == totalPages);
        setCurrentPage(Number(currentPage) + 1);
        setData([...data, ...trades]);
      });
    } catch (error) {
      console.log({error});
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, getTrades, max]);

  const getData = useCallback(
    async (initPage = currentPage) => {
      // console.log({getTrades});
      try {
        console.log('na you be the bastard');
        await getTrades(initPage).then((data) => {
          const {
            // eslint-disable-next-line no-shadow
            page,
            trades,
            // totalNotifications,
            totalPages,
          } = data;
          // console.log({data, totalPages});
          setMax(initPage == totalPages);
          setCurrentPage(Number(initPage) + 1);
          setData(trades);
        });
      } catch (error) {
        console.log({error});
      } finally {
        setLoading(false);
      }
    },
    [currentPage, getTrades],
  );
  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await getData(1);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, [getData]);

  useEffect(() => {
    console.log('na you be the bastard');
    const initPage = 1;
    (async () => {
      try {
        await getTrades(initPage).then((data) => {
          const {
            // eslint-disable-next-line no-shadow
            page,
            trades,
            // totalNotifications,
            totalPages,
          } = data;
          // console.log({data, totalPages});
          setMax(initPage == totalPages);
          setCurrentPage(Number(initPage) + 1);
          setData(trades);
        });
      } catch (error) {
        console.log({error});
      } finally {
        setLoading(false);
      }
    })();
  }, [getTrades]);
  console.log('omo');

  return (
    <Box flex={1}>
      {/* <Modal isVisible={isModalVisible} onBackdropPress={() => closeModal()}>
        <TransactionModal {...{closeModal}} />
      </Modal> */}
      {/* Header */}
      {loading ? (
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
        <FlatList
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          ListHeaderComponent={HeaderComponent}
          data={data}
          keyExtractor={(item, index) => uuid()}
          renderItem={({item}) => <TransactionTab {...item} />}
          ListFooterComponent={_renderFooter}
          ItemSeparatorComponent={ItemSeparatorComponent}
          // onEndReached={_handleLoadMore}
          onEndReachedThreshold={0.1}
        />
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
