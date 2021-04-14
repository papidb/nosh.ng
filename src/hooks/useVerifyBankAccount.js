import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {getFormData} from '@shared/utils';

export const useVerifyBankAccount = (
  isValid,
  values,
  verifyAccountFn,
  //   setLoading = () => {},
) => {
  const [account, setAccountName] = useState('');
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        let {nuban, bankcode, amount} = values;
        // console.log({nuban, bankcode});
        if (nuban && nuban.trim() == '') {
          nuban = null;
        }
        if (!isValid) return;
        if (!nuban || nuban.length !== 10) return;
        setLoading(true);
        Keyboard.dismiss();
        let bankData = await getFormData({code: bankcode, nuban: nuban.trim()});
        let accountName = await verifyAccountFn(bankData);
        // console.log({accountName});
        if (accountName == 'Unable to resolve bank') {
          setAccountName('Unable to resolve bank');
          setValid(false);
          //   wait(2000).then(() => {
          //     setAccountName('');
          //   });
          //   setFieldValue('nuban', '');
          return;
        }
        setValid(true);
        setLoading(false);
        setAccountName(accountName);
      })();
    } catch (error) {
      setValid(false);
      console.log({error});
    }
  }, [values, isValid, setLoading, verifyAccountFn]);

  return {account, loading, valid};
};
