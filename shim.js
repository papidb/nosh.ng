import logger from 'logger';

// shimming for reanimated need to happen before importing globalVariables.js
for (let variable of Object.entries(require('./globalVariables').default)) {
  Object.defineProperty(global, variable[0], {
    get: () => variable[1],
    set: () => {
      logger.sentry(`Trying to override internal Nosh var ${variable[0]}`);
    },
  });
}
