import shortid from 'shortid';

export const uuid = () => shortid.generate();

export const waait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));
