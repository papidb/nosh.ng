import {createSelector} from 'reselect';

export const selectUser = (state) => state.user;

export const selectHasUsername = createSelector(selectUser, (user) =>
  __DEV__ ? true : !!user.username,
);

export const selectPureUser = createSelector(selectUser, (user) => user);
