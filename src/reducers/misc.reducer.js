import {
  ONBOARDED,
  TOGGLE_BIO,
  UPDATE_BANKS,
  UPDATE_BANK_MAP,
} from 'action/type';
import data from 'constants/data';

const initialState = {
  bio: true,
  rates: {},
  banks: data.banks,
  bankMap: {},
  balanceHidden: false,
  onboarded: false,
};

export default function miscReducer(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case ONBOARDED:
      return {
        ...state,
        onboarded: true,
      };
    case TOGGLE_BIO:
      return {...state, bio: !state.bio};
    case UPDATE_BANKS:
      return {
        ...state,
        banks: payload,
      };
    case UPDATE_BANK_MAP:
      return {
        ...state,
        bankMap: payload,
      };

    default:
      return state;
  }
}
