import React, {useCallback, useState} from 'react';
import {useInfiniteQuery, UseInfiniteQueryOptions} from 'react-query';
import {getDataFromPurePages} from 'shared/utils';

/**
 * get all what you need from a infinte query
 * @param {function} query specified string
 * @param {string} queryKey query key for react-query
 * @param {string} key key used extract the data from the react query format
 * @param {UseInfiniteQueryOptions} options react-query options
 */

export function useNoshScroller(query, queryKey, key = 'trades', options = {}) {
  const [refreshing, setRefreshing] = useState(false);
  const getData = ({pageParam = 0}) => query(pageParam);
  const {
    data: pureData,
    refetch,
    fetchNextPage,
    ...queryDetails
  } = useInfiniteQuery(queryKey, getData, {
    getNextPageParam: (lastPage, pages) => {
      // eslint-disable-next-line eqeqeq
      if (lastPage?.currentPage == lastPage?.totalPages) {
        return undefined;
      }
      return lastPage?.currentPage;
    },
    staleTime: 0,
    cacheTime: 0,
    ...options,
  });
  const getDataFromPages = useCallback(
    (pages = []) => {
      return getDataFromPurePages(pages, key);
    },
    [key],
  );
  const {pages} = pureData || {};
  const data = getDataFromPages(pages);

  const goToFirst = useCallback(() => fetchNextPage({pageParam: 0}), [
    fetchNextPage,
  ]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return {
    refreshing,
    data,
    onRefresh,
    goToFirst,
    fetchNextPage,
    ...queryDetails,
  };
}
