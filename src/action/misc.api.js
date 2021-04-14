import axios from './axios';

import {ONBOARDED, UPDATE_BANKS, UPDATE_BANK_MAP} from './type';
import {BASE_URL} from 'constants/config';
import {HijackError} from 'shared/utils';

export const onBoardUser = () => (dispatch) => dispatch({type: ONBOARDED});

export const getBanks = () => {
  return (dispatch, getState) => {
    const store = getState();
    const {accessToken} = store?.user;
    return HijackError(
      axios
        .get(`${BASE_URL}banks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({data}) => {
          let banks = (data?.banks ?? [])
            // .filter()
            .map(({code, name}) => {
              return {
                value: code,
                label: name,
              };
            });
          let bankMap = {};
          banks.forEach((bank) => {
            bankMap[bank.value] = bank.label;
          });
          dispatch({type: UPDATE_BANKS, payload: banks});
          dispatch({type: UPDATE_BANK_MAP, payload: bankMap});
          return data;
        }),
      dispatch,
      getState,
    );
  };
};
