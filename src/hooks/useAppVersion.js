import {useEffect, useState} from 'react';
// import CodePush from 'react-native-code-push';
import VersionNumber from 'react-native-version-number';
import logger from 'logger';

function formatAppVersion(appVersion = VersionNumber.appVersion, update) {
  let version = `${appVersion} (${VersionNumber.buildVersion})`;
  if (update) {
    version = version + ` rev.${update.label.substring(1)}`;
  }
  return version;
}
const defaultAppVersion = formatAppVersion();

export function useAppVersion() {
  // eslint-disable-next-line no-unused-vars
  const [version, setVersion] = useState(defaultAppVersion);

  //   useEffect(() => {
  //     async function getAppVersion() {
  //       // Try to get the codepush version number
  //       try {
  //         const [{appVersion}, update] = await Promise.all([
  //           CodePush.getConfiguration(),
  //           CodePush.getUpdateMetadata(),
  //         ]);

  //         setVersion(formatAppVersion(appVersion, update));
  //       } catch (error) {
  //         logger.sentry('Error while trying to get App Version number', error);
  //       }
  //     }

  //     getAppVersion();
  //   }, []);

  return version;
}
