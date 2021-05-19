import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {useQuery} from 'react-query';

export const useVerifyBankAccount = (
  isValid,
  values,
  verifyAccountFn = () => {},
  //   setLoading = () => {},
) => {
  // const [result, setResult] = React.useState([]);
  const [loading, setLoading] = React.useState('false');
  const [accountName, setAccountName] = useState(null);

  useEffect(() => {
    async function validate(bankData) {
      try {
        setLoading('true');

        let accountNameResult =
          (await verifyAccountFn(bankData))?.accountData?.accountName ?? null;
        setAccountName(accountNameResult);
        setLoading('false');
      } catch (error) {
        setLoading('null');
      }
    }
    let {nuban, bankcode} = values;
    // console.log({nuban, bankcode});
    if (nuban && nuban.trim() === '') {
      nuban = null;
    }
    // if (!isValid) return;
    if (!nuban || nuban.length !== 10) return;
    // Keyboard.dismiss();
    let bankData = {bankCode: bankcode, accountNumber: nuban.trim()};
    validate(bankData);
    // setValid(true);
    // console.log({accountName});
  }, [values, verifyAccountFn]);

  return [accountName, loading];
};
