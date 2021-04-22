import React, {useState, useCallback, useEffect} from 'react';
import {FlatList, ActivityIndicator, StyleSheet} from 'react-native';

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

const TransactionScreen = ({getTrades}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pure, setPure] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [max, setMax] = useState(false);

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

  const getData = useCallback(async () => {
    // console.log({getTrades});
    try {
      await getTrades(currentPage).then((data) => {
        const {
          // eslint-disable-next-line no-shadow
          currentPage,
          trades,
          // totalNotifications,
          totalPages,
        } = data;
        setMax(currentPage == totalPages);
        setCurrentPage(Number(currentPage) + 1);
        setData(trades);
      });
    } catch (error) {
      console.log({error});
    } finally {
      setLoading(false);
    }
  }, [currentPage, getTrades]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Box flex={1}>
      <Modal isVisible={isModalVisible} onBackdropPress={() => closeModal()}>
        <TransactionModal {...{closeModal}} />
      </Modal>
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
          ListHeaderComponent={() => {
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
          }}
          data={data}
          keyExtractor={(item, index) => uuid()}
          renderItem={({item}) => <TransactionTab {...item} />}
          ListFooterComponent={_renderFooter}
          ItemSeparatorComponent={() => (
            <Divider style={{marginHorizontal: 18}} />
          )}
          onEndReached={_handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      )}
      <Divider style={[styles.bottomDivider, styles.noMarginTop]} />
      <Text textAlign="center" color="primary" fontSize={12} fontWeight="600">
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
