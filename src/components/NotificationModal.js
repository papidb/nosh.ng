/* eslint-disable eqeqeq */
import React, {useState, useCallback, useEffect} from 'react';
import {SectionList, ActivityIndicator} from 'react-native';

import {Box, Text, Loading, Close, Divider, HeaderInfo} from 'components';
import {useInfiniteQuery} from 'react-query';

import {
  commaFormatter,
  uuid,
  purgeData,
  getDataFromPagesPure,
} from 'shared/utils';

import {getNotifications} from 'action';
import {palette} from 'constants/theme';
import {connect} from 'react-redux';
import {NoNotification, NotificationItem} from 'components/Notification';

const Header = ({section: {title}}) => (
  <HeaderInfo
    text={String(title).toUpperCase()}
    containerProps={{backgroundColor: 'mostBgPure'}}
  />
);

export const NotificationModalList = ({closeModal, getNotifications}) => {
  const getData = ({pageParam = 0}) => getNotifications(pageParam);
  const {
    error,
    data: pureData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('notificationData', getData, {
    getNextPageParam: (lastPage, pages) => {
      // eslint-disable-next-line eqeqeq
      if (lastPage?.currentPage == lastPage?.totalPages) {
        return undefined;
      }
      return lastPage?.currentPage;
    },
    // staleTime: 60 * 60 * 60,
  });
  const getDataFromPages = useCallback((pages = [], key = 'notifications') => {
    const dataFromPure = getDataFromPagesPure(pages, key);
    dataFromPure.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return purgeData(dataFromPure);
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
          sections={data}
          keyExtractor={(item, index) => uuid()}
          renderItem={({item}) => <NotificationItem {...item} />}
          renderSectionHeader={Header}
          ListFooterComponent={_renderFooter}
          ItemSeparatorComponent={() => (
            <Divider style={{marginHorizontal: 18}} />
          )}
          onEndReached={_handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      )}
    </Box>
  );
};

export const NotificationModal = connect(null, {getNotifications})(
  NotificationModalList,
);
