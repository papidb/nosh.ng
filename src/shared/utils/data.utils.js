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
