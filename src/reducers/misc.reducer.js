import {ONBOARDED, TOGGLE_BIO} from 'action/type';

const initialState = {
  bio: true,
  rates: {},

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
    default:
      return state;
  }
}
