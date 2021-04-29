import {LOGIN, UPDATE_USER, LOGOUT} from '../action/type';
import Intercom from 'react-native-intercom';
// import crashlytics from '@react-native-firebase/crashlytics';
// import messaging from '@react-native-firebase/messaging';

const initialState = {
  wallet: {
    balance: 0,
    transactions: [],
    trades: [],
    banks: [],
  },
  avatar: '',
  notifications: [],
  BVN: '',
  role: 'user',
  suspended: false,
  userId: '',
  _id: '',
  name: '',
  email: '',
  phoneNumber: '',
  lastLogin: '',
  createdAt: '',
  updatedAt: '',
  accessToken: '',
  refreshToken: '',
};

export default function userReducer(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case UPDATE_USER:
      Intercom.registerIdentifiedUser({userId: payload?.user?.name});
      Intercom.updateUser({
        // Pre-defined user attributes
        email: payload?.user?.email,
        user_id: payload?.user?.userId,
        name: payload?.user?.name,
        // unsubscribed_from_emails: true,
      });
      // console.log(payload?.user?.wallet?.banks == null);

      let banks = payload?.user?.wallet?.banks;
      if (banks == null || banks?.length == 0) {
        return {
          ...state,
          ...(payload?.user ?? {}),
          wallet: {
            ...payload?.user?.wallet,
            banks: [],
          },
        };
      }
      return {
        ...(payload?.user ?? {}),
      };
    case LOGIN:
      const {user} = payload;
      delete user.accessToken;
      delete user.refreshToken;
      //   try {
      //     Intercom.registerIdentifiedUser({userId: data.email});
      //     Intercom.updateUser({
      //       // Pre-defined user attributes
      //       email: data.email,
      //       user_id: data.email,
      //       name: data.name,
      //       unsubscribed_from_emails: true,
      //     });
      //     crashlytics().log('User signed in.');
      //     Promise.all([
      //       crashlytics().setUserId(data.email),
      //       crashlytics().setAttributes({
      //         email: data.email,
      //         name: data.name,
      //       }),
      //     ]).catch((err) => {
      //       crashlytics().log(err);
      //     });
      //   } catch (error) {}
      return {
        ...state,
        ...user,
      };
    case LOGOUT:
      Intercom.logout();
      //   try {
      //     messaging()
      //       .unsubscribeFromTopic('nosh')
      //       .then((value) => console.log({value}));
      //     if (__DEV__) {
      //       messaging()
      //         .unsubscribeFromTopic('test')
      //         .then((value) => console.log({value}));
      //     }
      //   } catch (error) {
      //     console.log({error});
      //   }
      return {
        ...initialState,
        email: state.email,
        name: state.name,
        userId: state.userId,
        _id: state._id,
        avatar: state.avatar,
      };

    default:
      return state;
  }
}
