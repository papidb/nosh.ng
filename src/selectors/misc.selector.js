import {createSelector} from 'reselect';

export const selectMisc = (state) => state.misc;

export const selectCardSubCategories = createSelector(
  selectMisc,
  (misc) => misc.cardSubCategories,
);

export const selectMinimumWithdrawalableAmount = createSelector(
  selectMisc,
  (misc) => misc?.serverState?.minimumAmountWithdrawable ?? 200,
);
export const bankDeets = createSelector(selectMisc, (misc) => ({
  bankList: misc?.banks ?? [],
  bankMap: misc?.bankMap ?? {},
}));
