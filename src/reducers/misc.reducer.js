import {
  ONBOARDED,
  TOGGLE_BIO,
  UPDATE_BANKS,
  UPDATE_BANK_MAP,
  SET_CARDS,
  UPDATE_SETTINGS,
} from 'action/type';
import data from 'constants/data';

const initialState = {
  bio: true,
  rates: {},
  banks: data.banks,
  bankMap: {},
  balanceHidden: false,
  cardSubCategories: [],
  onboarded: false,
  serverState: {},
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
    case SET_CARDS:
      return {
        ...state,
        cardSubCategories: payload,
      };
    case UPDATE_SETTINGS: {
      return {
        ...state,
        serverState: payload,
      };
    }

    default:
      return state;
  }
}
