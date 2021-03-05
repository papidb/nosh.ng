const images = {
  auth_logo: require('assets/images/auth_logo.png'),
};
const toArray = () => {
  let keys = Object.keys(images);
  return keys.map((key) => images[key]);
};
export default {
  ...images,
  toArray,
};
