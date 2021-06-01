import {createSelector} from 'reselect';

export const selectUser = (state) => state.user;

export const selectHasUsername = createSelector(
  selectUser,
  (user) => console.log({user}) || !!user.username,
);

export const selectPureUser = createSelector(selectUser, (user) => user);
export const selectBanks = createSelector(
  selectUser,
  (user) => user?.wallet?.banks ?? [],
);
