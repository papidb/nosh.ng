import {createSelector} from 'reselect';

export const selectMisc = (state) => state.misc;

export const selectCardSubCategories = createSelector(
  selectMisc,
  (misc) => misc.cardSubCategories,
);

export const selectMinimumWithdrawalableAmount = createSelector(
  selectMisc,
  (misc) => misc.serverState,
);
