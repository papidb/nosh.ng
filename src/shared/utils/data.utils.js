import FormData from 'form-data';
import {Platform} from 'react-native';
import shortid from 'shortid';
import mime from 'mime';
import {format} from 'date-fns';

export const getErrorMessage = (error) => {
  if (error?.response?.data?.message) return error?.response?.data?.message;
  return null;
};

export const extractErrorMessage = (err) => {
  // const {response, request} = err;
  let temp = getErrorMessage(err);
  if (temp) return temp;
  return null;
  // if (response) {
  //   const {data: res} = response.data;
  //   if (response?.data?.message) return response?.data?.message;
  //   const message = res?.error.message;
  //   return message;
  // } else {
  //   const message = request?._response;
  //   return message;
  // }
};

export const getMessage = () => {
  let message = '';
  const data = [
      [22, 'Working Late'],
      [18, 'Good Evening'],
      [12, 'Good Afternoon'],
      [5, 'Good Morning'],
      [0, 'Whoa, early bird'],
    ],
    hr = new Date().getHours();
  for (let i = 0; i < data.length; i++) {
    if (hr >= data[i][0]) {
      message = data[i][1];
      break;
    }
  }
  return message;
};

// approved, rejected, pending
const allowStatus = ['approved', 'rejected'];

export const includesStatus = (status) => allowStatus.includes(status);
export const purifyStatus = (status) =>
  includesStatus(status) ? status : 'greyish';

export const getFormData = (values) => {
  let data = new FormData();
  Object.keys(values).forEach((key) => {
    data.append(key, values[key]);
  });
  return data;
};

const createFileForm = ({path: uri, mime: type}) => {
  const newImageUri = 'file:///' + uri.split('file:/').join('');

  return {
    name: shortid.generate(),
    type: mime.getType(newImageUri),
    uri: Platform.OS === 'android' ? newImageUri : uri.replace('file://', ''),
  };
};

export const createFormData = ({uri, type}) => {
  const data = new FormData();

  data.append('avatar', {
    name: shortid.generate(),
    type: type,
    uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
  });
  return data;
};
export const createFormArrayData = (arr = []) => {
  const data = new FormData();
  arr.forEach((avatar) => {
    console.log({avatar});
    return data.append('tradeFiles', createFileForm(avatar));
  });
  return data;
};

export const getAppBanks = (rawBanks) => {
  let banks = (rawBanks ?? [])
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
  return {banks, bankMap};
};

export const isToday = (someDate) => {
  const today = new Date();
  someDate = new Date(someDate);
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};
export const isYesterday = (someDate) => {
  someDate = new Date(someDate);

  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);
  return (
    someDate.getDate() === yesterday.getDate() &&
    someDate.getMonth() === yesterday.getMonth() &&
    someDate.getFullYear() === yesterday.getFullYear()
  );
};

export function purgeData(arr) {
  if (!arr || arr.length === 0) return [];
  // this gives an object with dates as keys
  const groups = arr.reduce((groups, transaction) => {
    let time;
    try {
      time = new Date(transaction.createdAt);
    } catch (error) {
      time = new Date();
    }
    const date = isToday(time)
      ? 'Today'
      : isYesterday(time)
      ? 'Yesterday'
      : // : format(time, 'MMM i, y');
        format(time, 'MMMM');
    // console.log({date})
    // console.log({date: new Date(transaction.time*1000)})
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});
  // return [];

  // Edit: to add it in the array format instead
  return Object.keys(groups).map((date) => {
    return {
      title: date,
      data: groups[date],
    };
  });
}
