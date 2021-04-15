import axios from './axios';

import {ONBOARDED, UPDATE_BANKS, UPDATE_BANK_MAP} from './type';
import {BASE_URL} from 'constants/config';
import {HijackError, getAppBanks} from 'shared/utils';

export const onBoardUser = () => (dispatch) => dispatch({type: ONBOARDED});

export const getBanks = () => {
  return (dispatch, getState) => {
    const store = getState();
    const {accessToken} = store?.auth;
    return HijackError(
      axios
        .get(`${BASE_URL}banks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({data}) => {
          const {banks, bankMap} = getAppBanks(data?.banks);
          dispatch({type: UPDATE_BANKS, payload: banks});
          dispatch({type: UPDATE_BANK_MAP, payload: bankMap});
          return {banks, bankMap};
        }),
      dispatch,
      getState,
    );
  };
};

export const getNotifications = () => {
  return (dispatch, getState) => {
    const store = getState();
    const {accessToken} = store?.auth;
    return HijackError(
      axios
        .get(`${BASE_URL}banks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({data}) => {
          const notifications = data?.notifications ?? [];
          return notifications;
        }),
      dispatch,
      getState,
    );
  };
};
