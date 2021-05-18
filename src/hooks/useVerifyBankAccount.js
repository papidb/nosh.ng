import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export const useVerifyBankAccount = (
  isValid,
  values,
  verifyAccountFn = () => {},
  //   setLoading = () => {},
) => {
  const [account, setAccountName] = useState('');
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        let {nuban, bankcode} = values;
        // console.log({nuban, bankcode});
        if (nuban && nuban.trim() == '') {
          nuban = null;
        }
        if (!isValid) return;
        if (!nuban || nuban.length !== 10) return;
        setLoading(true);
        Keyboard.dismiss();
        let bankData = {bankCode: bankcode, accountNumber: nuban.trim()};
        let accountName =
          (await verifyAccountFn(bankData))?.accountData?.accountName ?? null;
        setValid(true);
        setLoading(false);
        // console.log({accountName});
        setAccountName(accountName);
      })();
    } catch (error) {
      setValid(false);
      setLoading(false);
      // console.log({error});
    }
  }, [values, isValid, setLoading, verifyAccountFn]);

  return {account, loading, valid};
};
