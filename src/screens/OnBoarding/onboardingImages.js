export function splitToChunks(array, parts) {
  let result = [];
  for (let i = parts; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
}

export const onboardingImages = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  require('../../assets/onboarding/048.png'),
  require('../../assets/onboarding/049.png'),
  require('../../assets/onboarding/050.png'),
  require('../../assets/onboarding/051.png'),
  require('../../assets/onboarding/052.png'),
  require('../../assets/onboarding/053.png'),
  require('../../assets/onboarding/054.png'),
  require('../../assets/onboarding/055.png'),
  require('../../assets/onboarding/056.png'),
  require('../../assets/onboarding/057.png'),
  require('../../assets/onboarding/058.png'),
  require('../../assets/onboarding/059.png'),
  require('../../assets/onboarding/060.png'),
  require('../../assets/onboarding/061.png'),
  require('../../assets/onboarding/062.png'),
  require('../../assets/onboarding/063.png'),
  require('../../assets/onboarding/064.png'),
  require('../../assets/onboarding/065.png'),
  require('../../assets/onboarding/066.png'),
  require('../../assets/onboarding/067.png'),
  require('../../assets/onboarding/068.png'),
  require('../../assets/onboarding/069.png'),
  require('../../assets/onboarding/070.png'),
  require('../../assets/onboarding/071.png'),
  require('../../assets/onboarding/072.png'),
  require('../../assets/onboarding/073.png'),
  require('../../assets/onboarding/074.png'),
  require('../../assets/onboarding/075.png'),
  require('../../assets/onboarding/076.png'),
  require('../../assets/onboarding/077.png'),
  require('../../assets/onboarding/078.png'),
  require('../../assets/onboarding/079.png'),
  require('../../assets/onboarding/080.png'),
  require('../../assets/onboarding/081.png'),
  require('../../assets/onboarding/082.png'),
  require('../../assets/onboarding/083.png'),
  require('../../assets/onboarding/084.png'),
  require('../../assets/onboarding/085.png'),
  require('../../assets/onboarding/086.png'),
  require('../../assets/onboarding/087.png'),
  require('../../assets/onboarding/088.png'),
  require('../../assets/onboarding/089.png'),
  require('../../assets/onboarding/090.png'),
  require('../../assets/onboarding/091.png'),
  require('../../assets/onboarding/092.png'),
  require('../../assets/onboarding/093.png'),
  require('../../assets/onboarding/094.png'),
  require('../../assets/onboarding/095.png'),
  require('../../assets/onboarding/096.png'),
  require('../../assets/onboarding/097.png'),
  require('../../assets/onboarding/098.png'),
  require('../../assets/onboarding/099.png'),
  require('../../assets/onboarding/100.png'),
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  require('../../assets/onboarding/148.png'),
  require('../../assets/onboarding/149.png'),
  require('../../assets/onboarding/150.png'),
  require('../../assets/onboarding/151.png'),
  require('../../assets/onboarding/152.png'),
  require('../../assets/onboarding/153.png'),
  require('../../assets/onboarding/154.png'),
  require('../../assets/onboarding/155.png'),
  require('../../assets/onboarding/156.png'),
  require('../../assets/onboarding/157.png'),
  require('../../assets/onboarding/158.png'),
  require('../../assets/onboarding/159.png'),
  require('../../assets/onboarding/160.png'),
  require('../../assets/onboarding/161.png'),
  require('../../assets/onboarding/162.png'),
  require('../../assets/onboarding/163.png'),
  require('../../assets/onboarding/164.png'),
  require('../../assets/onboarding/165.png'),
  require('../../assets/onboarding/166.png'),
  require('../../assets/onboarding/167.png'),
  require('../../assets/onboarding/168.png'),
  require('../../assets/onboarding/169.png'),
  require('../../assets/onboarding/170.png'),
  require('../../assets/onboarding/171.png'),
  require('../../assets/onboarding/172.png'),
  require('../../assets/onboarding/173.png'),
  require('../../assets/onboarding/174.png'),
  require('../../assets/onboarding/175.png'),
  require('../../assets/onboarding/176.png'),
  require('../../assets/onboarding/177.png'),
  require('../../assets/onboarding/178.png'),
  require('../../assets/onboarding/179.png'),
  require('../../assets/onboarding/180.png'),
  require('../../assets/onboarding/181.png'),
  require('../../assets/onboarding/182.png'),
  require('../../assets/onboarding/183.png'),
  require('../../assets/onboarding/184.png'),
  require('../../assets/onboarding/185.png'),
  require('../../assets/onboarding/186.png'),
  require('../../assets/onboarding/187.png'),
  require('../../assets/onboarding/188.png'),
  require('../../assets/onboarding/189.png'),
  require('../../assets/onboarding/190.png'),
  require('../../assets/onboarding/191.png'),
  require('../../assets/onboarding/192.png'),
  require('../../assets/onboarding/193.png'),
  require('../../assets/onboarding/194.png'),
  require('../../assets/onboarding/195.png'),
  require('../../assets/onboarding/196.png'),
  require('../../assets/onboarding/197.png'),
  require('../../assets/onboarding/198.png'),
  require('../../assets/onboarding/199.png'),
  require('../../assets/onboarding/200.png'),
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];
