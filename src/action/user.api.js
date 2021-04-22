import axios from './axios';
import FormData from 'form-data';

import {UPDATE_USER, SET_CARDS} from './type';
import {BASE_URL} from 'constants/config';
import {HijackError} from 'shared/utils';

export const getUser = () => {
  return (dispatch, getState) => {
    const store = getState();
    const {accessToken} = store?.auth;
    const {_id} = store?.user;
    return HijackError(
      axios
        .get(`${BASE_URL}user/${_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({data}) => {
          // console.log({data});
          dispatch({type: UPDATE_USER, payload: data});
          return data;
        }),
      dispatch,
      getState,
    );
  };
};
export const getNotifications = (state) => {
  return (dispatch, getState) => {
    const store = getState();
    const {accessToken} = store?.auth;
    const {_id} = store?.user;
    // console.log(`${BASE_URL}notifications/${_id} ${accessToken}`);
    return HijackError(
      axios
        .get(`${BASE_URL}notifications/${_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({data}) => {
          return data;
        }),
      dispatch,
      getState,
    );
  };
};

export const getTrades = (state) => {
  return (dispatch, getState) => {
    const store = getState();
    const {accessToken} = store?.auth;
    const {_id} = store?.user;
    return HijackError(
      axios
        .get(`${BASE_URL}trades/${_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({data}) => {
          return data;
        }),
      dispatch,
      getState,
    );
  };
};

export const updateProfilePic = (state) => (dispatch, getState) => {
  const store = getState();
  const {accessToken} = store?.auth;
  const {_id} = store?.user;
  return HijackError(
    axios
      .put(`${BASE_URL}user/${_id}`, state, {
        headers: {Authorization: `Bearer ${accessToken}`},
      })
      .then(({data}) => data),
    dispatch,
    getState,
  );
};

export const tradeCard = (state) => (dispatch, getState) => {
  const store = getState();
  const {accessToken} = store?.auth;
  // console.log({state});
  // console.log({accessToken});
  const {_id} = store?.user;
  // console.log(`${BASE_URL}trade-card/${_id}`);
  return HijackError(
    axios
      .post(`${BASE_URL}trade-card/${_id}`, state, {
        headers: {Authorization: `Bearer ${accessToken}`},
        // ...new FormData().getHeaders(),
      })
      .then(({data}) => data),
    dispatch,
    getState,
  );
};

export const getCards = (state) => (dispatch, getState) => {
  const store = getState();
  const {accessToken} = store?.auth;
  return HijackError(
    axios
      .get(`${BASE_URL}card-categories`, state, {
        headers: {Authorization: `Bearer ${accessToken}`},
      })
      .then(({data}) => {
        const cardCategories = data?.cardCategories ?? [];
        // data?.cardCategories.map((card) => {
        //   console.log(card?.cardSubCategories);
        // });
        dispatch({type: SET_CARDS, payload: cardCategories});
        return data;
      }),
    dispatch,
    getState,
  );
};
