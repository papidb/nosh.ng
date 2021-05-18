import React from 'react';
import {useQuery, UseQueryOptions} from 'react-query';

/**
 * get user object
 * @param {function} fn get user function
 * @param {UseQueryOptions} options react-query options
 */
export const useUserQuery = (fn = () => {}, options) => {
  return useQuery('users', () => fn(), {
    staleTime: 5 * 60 * 60, // 5 minutes
    ...options,
  });
};
