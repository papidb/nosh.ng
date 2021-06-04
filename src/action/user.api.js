import axios from './axios';
import FormData from 'form-data';

import {UPDATE_USER, SET_CARDS, UPDATE_SETTINGS} from './type';
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
          let user = data?.user ?? {};
          dispatch({type: UPDATE_USER, payload: user});
          // delete user.fcmTokens;
          return user;
        }),
      dispatch,
      getState,
    );
  };
};

export const deleteBank = ({id}) => {
  console.log({id});
  return (dispatch, getState) => {
    const store = getState();
    const {accessToken} = store?.auth;
    return HijackError(
      axios
        .delete(`${BASE_URL}delete-bank/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({data}) => data),
      dispatch,
      getState,
    );
  };
};

export const getNotifications = (page = 0) => {
  page = page + 1;
  return (dispatch, getState) => {
    const store = getState();
    const {accessToken} = store?.auth;
    const {_id} = store?.user;
    // console.log(`${BASE_URL}notifications/${_id} ${accessToken}`);
    // console.log({page});
    return HijackError(
      axios
        .get(`${BASE_URL}notifications/${_id}?currentPage=${page}`, {
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

export const getTransactions = (page) => {
  return (dispatch, getState) => {
    page = page + 1;
    const store = getState();
    const {accessToken} = store?.auth;
    const {_id} = store?.user;
    // console.log(`${BASE_URL}notifications/${_id} ${accessToken}`);
    // console.log({page});
    return HijackError(
      axios
        .get(`${BASE_URL}transactions/${_id}?currentPage=${page}`, {
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

export const getAllSubCategories = (state) => {
  return (dispatch, getState) => {
    const store = getState();
    const {accessToken} = store?.auth;
    // console.log(`${BASE_URL}notifications/${_id} ${accessToken}`);
    return HijackError(
      axios
        .get(`${BASE_URL}card-sub-categories`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({data}) => {
          const cardSubCategories = data?.cardSubCategories ?? [];
          const container = {};

          cardSubCategories.forEach((sub) => {
            const {cardCategory} = sub;
            const obj = container[cardCategory._id];
            if (!obj) {
              container[cardCategory._id] = sub;
            }
            if (!!obj && 'rate' in obj && obj.rate < sub.rate) {
              container[cardCategory._id] = sub;
            }
          });
          const full = Object.keys(container).map((key) => container[key]);
          full.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));
          return full.slice(0, 15);
        }),
      dispatch,
      getState,
    );
  };
};

export const getTrades = (page) => {
  page = page + 1;
  return (dispatch, getState) => {
    const store = getState();
    const {accessToken} = store?.auth;
    const {_id} = store?.user;
    // console.log({page});
    return HijackError(
      axios
        .get(`${BASE_URL}trades/${_id}?currentPage=${page}`, {
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

export const updateUsername = (state) => (dispatch, getState) => {
  const store = getState();
  const {accessToken} = store?.auth;
  const {_id} = store?.user;
  return HijackError(
    axios
      .put(`${BASE_URL}username/${_id}`, state, {
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
        return cardCategories;
      }),
    dispatch,
    getState,
  );
};

export const updatePushNotificationToken = (fcmToken = '') => (
  dispatch,
  getState,
) => {
  const store = getState();
  const {accessToken} = store?.auth;
  const {_id} = store?.user;
  return HijackError(
    axios
      .post(
        `${BASE_URL}fcm-token/${_id}`,
        {fcmToken},
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      )
      .then(({data}) => {
        return data;
      }),
    dispatch,
  );
};

export const getSettings = () => {
  return (dispatch, getState) => {
    const store = getState();
    const {accessToken} = store?.auth;
    const {_id} = store?.user;
    return HijackError(
      axios
        .get(`${BASE_URL}settings`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({data}) => {
          // console.log({data});
          dispatch({type: UPDATE_SETTINGS, payload: data?.settings ?? {}});
          return data;
        }),
      dispatch,
      getState,
    );
  };
};
