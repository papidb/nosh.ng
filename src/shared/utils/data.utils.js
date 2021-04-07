import FormData from 'form-data';
import {Platform} from 'react-native';
import shortid from 'shortid';

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

export const getFormData = (values) => {
  let data = new FormData();
  Object.keys(values).forEach((key) => {
    data.append(key, values[key]);
  });
  return data;
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
