const images = {
  auth_logo: require('assets/images/auth_logo.png'),
  auth_face: require('assets/images/auth_face.png'),
  itunes_2: require('assets/images/itunes2.png'),
  FFHome: require('assets/images/FFHome.png'),
};
const toArray = () => {
  let keys = Object.keys(images);
  return keys.map((key) => images[key]);
};
export default {
  ...images,
  toArray,
};
