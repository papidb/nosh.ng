import shortid from 'shortid';

export const uuid = () => shortid.generate();

export const waait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export function truncateString(string = '', maxLen = 25) {
  return string.length > maxLen
    ? string.substring(0, maxLen - 3) + '...'
    : string;
}

export function getFirstLetter(string = '') {
  return string.charAt(0);
}
export function capitalizeFirstLetter(string = '') {
  string = String(string);
  return getFirstLetter(string).toUpperCase() + string.slice(1);
}

export const generateReadableName = (user) =>
  `${user.firstName} ${getFirstLetter(user.lastName).toUpperCase()}.`;
