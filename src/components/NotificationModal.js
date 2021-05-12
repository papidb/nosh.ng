/* eslint-disable eqeqeq */
import React, {useState, useCallback, useEffect} from 'react';
import {
  SectionList,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';

import {Box, Text, Loading, Close, Divider, HeaderInfo} from 'components';
import {useInfiniteQuery} from 'react-query';

import {
  commaFormatter,
  uuid,
  purgeData,
  getDataFromPurePages,
} from 'shared/utils';

import {getNotifications} from 'action';
import {palette} from 'constants/theme';
import {connect} from 'react-redux';
import {NoNotification, NotificationItem} from 'components/Notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const Header = ({section: {title}}) => (
  <HeaderInfo
    text={String(title).toUpperCase()}
    containerProps={{backgroundColor: 'mostBgPure'}}
  />
);

export const NotificationModalList = ({closeModal, getNotifications}) => {
  const [refreshing, setRefreshing] = useState(false);
  const dateSorter = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
  const getData = ({pageParam = 0}) => getNotifications(pageParam);
  const {
    error,
    data: pureData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    status,
  } = useInfiniteQuery('notificationData', getData, {
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
  const getDataFromPages = useCallback((pages = [], key = 'notifications') => {
    const dataFromPurePages = getDataFromPurePages(pages, key);
    dataFromPurePages.sort(dateSorter);
    return purgeData(dataFromPurePages);
  }, []);
  const {pages} = pureData || {};
  const data = getDataFromPages(pages);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

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

  useEffect(() => {
    if (Platform.OS === 'ios')
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
  }, []);

  return (
    <Box
      backgroundColor="white"
      borderRadius={38}
      padding="l"
      height="75%"
      style={{paddingHorizontal: 15}}>
      <Close onPress={closeModal} />

      <Text
        fontWeight="600"
        color="primary"
        textAlign="center"
        marginBottom="l">
        Notifications
      </Text>
      {status === 'loading' && <Loading />}
      {status === 'error' && (
        <Box>
          <Text>Something went wrong!!!</Text>
        </Box>
      )}
      {status === 'success' && data.length === 0 ? (
        <NoNotification />
      ) : (
        <SectionList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          sections={data}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => <NotificationItem {...item} />}
          renderSectionHeader={Header}
          ListFooterComponent={_renderFooter}
          ItemSeparatorComponent={() => (
            <Divider style={{marginHorizontal: 18}} />
          )}
          onEndReached={_handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </Box>
  );
};

export const NotificationModal = connect(null, {getNotifications})(
  NotificationModalList,
);
