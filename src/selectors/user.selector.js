import {createSelector} from 'reselect';

export const selectUser = (state) => state.user;

export const selectHasUsername = createSelector(
  selectUser,
  (user) => !!user.username,
);

export const selectPureUser = createSelector(selectUser, (user) => user);
