const images = {
  auth_logo: require('assets/images/auth_logo.png'),
  auth_face: require('assets/images/auth_face.png'),
  itunes_2: require('assets/images/itunes2.png'),
  FFHome: require('assets/images/FFHome.png'),
  Hands: require('assets/images/Hands.png'),
  discount: require('assets/images/discount.png'),
  HomeCard: require('assets/images/Cards.png'),
  HomeCard2: require('assets/images/Cards2.png'),
  kuda: require('assets/images/Kuda.png'),
  fire: require('assets/images/fire.gif'),
  calculator: require('assets/images/Calc.png'),
};
const toArray = () => {
  let keys = Object.keys(images);
  return keys.map((key) => images[key]);
};
export default {
  ...images,
  toArray,
};
