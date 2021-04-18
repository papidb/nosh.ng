// import {captureException, captureMessage} from '@sentry/react-native';
import {forEach, isNil} from 'lodash';
// import DeviceInfo from 'react-native-device-info';
import {
  ACCESS_CONTROL,
  ACCESSIBLE,
  AUTHENTICATION_TYPE,
  canImplyAuthentication,
  getAllInternetCredentials,
  //   getAllInternetCredentialsKeys,
  getInternetCredentials,
  hasInternetCredentials,
  Options,
  resetInternetCredentials,
  Result,
  setInternetCredentials,
  setGenericPassword,
} from 'react-native-keychain';
// import {delay} from '../helpers/utilities';
import {request, PERMISSIONS} from 'react-native-permissions';

const captureException = (err) => {};
const captureMessage = () => {};

const delay = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function saveString(key, value, accessControlOptions) {
  return new Promise(async (resolve, reject) => {
    try {
      await setInternetCredentials(key, key, value, accessControlOptions);
      console.log(`Keychain: saved string for key: ${key}`);
      resolve();
    } catch (e) {
      console.log(`Keychain: failed to save string for key: ${key}`, e);
      captureMessage('Keychain write first attempt failed');
      await delay(1000);
      try {
        await setInternetCredentials(key, key, value, accessControlOptions);
        console.log(`Keychain: saved string for key: ${key} on second attempt`);
        resolve();
      } catch (e) {
        console.log(`Keychain: failed to save string for key: ${key}`, e);
        captureMessage('Keychain write second attempt failed');
        reject(e);
      }
    }
  });
}

export async function loadString(key, options) {
  try {
    const credentials = await getInternetCredentials(key, options);
    if (credentials) {
      console.log(`Keychain: loaded string for key: ${key}`);
      return credentials.password;
    }
    console.log(`Keychain: string does not exist for key: ${key}`);
  } catch (err) {
    if (err.toString() === 'Error: User canceled the operation.') {
      return -1;
    }
    console.log(
      `Keychain: failed to load string for key: ${key} error: ${err}`,
    );
    captureException(err);
  }
  return null;
}

export async function saveObject(key, value, accessControlOptions) {
  const jsonValue = JSON.stringify(value);
  return saveString(key, jsonValue, accessControlOptions);
}

export async function loadObject(key, options) {
  const jsonValue = await loadString(key, options);
  if (!jsonValue) return null;
  if (jsonValue === -1) {
    return -1;
  }
  try {
    const objectValue = JSON.parse(jsonValue);
    console.log(`Keychain: parsed object for key: ${key}`);
    return objectValue;
  } catch (err) {
    console.log(
      `Keychain: failed to parse object for key: ${key} error: ${err}`,
    );
    captureException(err);
  }
  return null;
}

export async function remove(key) {
  try {
    await resetInternetCredentials(key);
    console.log(`Keychain: removed value for key: ${key}`);
  } catch (err) {
    console.log(
      `Keychain: failed to remove value for key: ${key} error: ${err}`,
    );
    captureException(err);
  }
}

export async function loadAllKeys() {
  try {
    const response = await getAllInternetCredentials();
    if (response) {
      return response.results;
    }
  } catch (err) {
    console.log(`Keychain: failed to loadAllKeys error: ${err}`);
    captureException(err);
  }
  return null;
}

export async function getAllKeysAnonymized() {
  const data = {};
  const results = await loadAllKeys();
  forEach(results, (result) => {
    data[result?.username] = {
      length: result?.password?.length,
      nil: isNil(result?.password),
      type: typeof result?.password,
    };
  });
  return data;
}

// export async function loadAllKeysOnly(): Promise<null | string[]> {
//   try {
//     const response = await getAllInternetCredentialsKeys();
//     if (response) {
//       return response.results;
//     }
//   } catch (err) {
//     console.log(`Keychain: failed to loadAllKeys error: ${err}`);
//     captureException(err);
//   }
//   return null;
// }

export async function hasKey(key) {
  try {
    const result = await hasInternetCredentials(key);
    return result;
  } catch (err) {
    console.log(
      `Keychain: failed to check if key ${key} exists -  error: ${err}`,
    );
    captureException(err);
  }
  return false;
}

export async function wipeKeychain() {
  try {
    const results = await loadAllKeys();
    if (results) {
      await Promise.all(
        results?.map((result) => resetInternetCredentials(result.username)),
      );
      console.log('keychain wiped!');
    }
  } catch (e) {
    console.log('error while wiping keychain');
    captureException(e);
  }
}

export async function getPrivateAccessControlOptions() {
  let res = {};
  // This method is iOS Only!!!
  try {
    const canAuthenticate = await canImplyAuthentication({
      authenticationType: AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
    });

    let isSimulator = false;

    if (canAuthenticate) {
      //   isSimulator = __DEV__ && (await DeviceInfo.isEmulator());
      isSimulator = __DEV__;
    }
    if (canAuthenticate && !isSimulator) {
      res = {
        accessControl: ACCESS_CONTROL.USER_PRESENCE,
        accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      };
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}

  return res;
}

export const saveToKeyChain = async (username, password, option) => {
  try {
    await setGenericPassword(username, password, option);
  } catch (err) {
    console.log({err});
  }
};

export async function requestFaceId() {
  return request(PERMISSIONS.IOS.FACE_ID);
}
