import {Platform} from 'react-native';
import {isNil} from 'lodash';
import {useEffect, useState} from 'react';
import {isPinOrFingerprintSet} from 'react-native-device-info';
import * as Keychain from 'react-native-keychain';
import useAppState from './useAppState.js';
import useIsMounted from './useIsMounted';
import usePrevious from './usePrevious';

import data from 'constants/data';

const isAndroid = Platform.OS === 'android';
const BiometryTypes = data.BiometryTypes;

export function useBiometryType() {
  const {justBecameActive} = useAppState();
  const isMounted = useIsMounted();
  const [biometryType, setBiometryType] = useState(null);
  const prevBiometricType = usePrevious(biometryType);
  console.log({justBecameActive});

  useEffect(() => {
    const getSupportedBiometryType = async () => {
      let type = await Keychain.getSupportedBiometryType();
      console.log({type});

      // omo no time for many many
      // you no get bio you non go see anything my guy
      if (isNil(type) && isAndroid) {
        type = BiometryTypes.none;
      }
      if (isNil(type) && !isAndroid) {
        // 💡️ When `getSupportedBiometryType` returns `null` it can mean either:
        //    A) the user has no device passcode/biometrics at all
        //    B) the user has gone into Settings and disabled biometrics specifically for Nosh
        type = await isPinOrFingerprintSet().then((isPinOrFingerprintSet) =>
          isPinOrFingerprintSet ? BiometryTypes.passcode : BiometryTypes.none,
        );
        // console.log({type});
      }

      if (isMounted.current && type !== prevBiometricType) {
        setBiometryType(type);
      }
    };

    if (!biometryType || justBecameActive) {
      getSupportedBiometryType();
    }
  }, [biometryType, isMounted, justBecameActive, prevBiometricType]);

  return biometryType;
}
