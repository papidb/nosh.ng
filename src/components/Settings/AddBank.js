import React, {useEffect, useState} from 'react';

import PropTypes from 'prop-types';

import * as Yup from 'yup';
import {useFormik} from 'formik';

import {Box, Text, HeaderInfo, Input, Select, Button} from 'components';
import data from 'constants/data';
import {palette} from 'constants/theme';
import {
  showErrorSnackBar,
  showSuccessSnackBar,
  extractErrorMessage,
} from 'shared/utils';
import {ModalContainer} from './ModalContainer';
import {useStore} from 'react-redux';
import {useVerifyBankAccount} from 'hooks';

const BankSchema = Yup.object({
  bankcode: Yup.string().required('Required!').notOneOf(['Bank'], 'Required'),
  nuban: Yup.string().required('Required!').min(10, 'Invalid!'),
});

const initailValues = __DEV__
  ? {
      nuban: '0214956707',
      bankcode: '058',
    }
  : {nuban: '', bankcode: ''};
export const AddBank = ({
  close,
  getUser,
  addBank,
  user,
  getBanks,
  verifyAccount,
}) => {
  const {
    misc: {banks: reduxBanks = [], bankMap: reduxBankMap = {}},
  } = useStore().getState();
  // console.log({reduxBanks});

  const [bankList, setBanks] = useState(reduxBanks);
  const [bankMap, setBankMap] = useState(reduxBankMap);
  // console.log({bankList, bankMap});

  useEffect(() => {
    (async () => {
      console.log('getting banks');
      const {banks: rawBanks, bankMap: rawBankMap} = await getBanks();
      setBanks(rawBanks);
      setBankMap(rawBankMap);
      console.log('done getting banks');
    })();
  }, [getBanks]);
  const {
    errors,
    values,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    isSubmitting,
    // validateForm,
    // resetForm,
    setFieldValue,
    // setValues,
    setFieldTouched,
    // isValid,
    // dirty,
  } = useFormik({
    initialValues: initailValues,
    onSubmit: async (values) => {
      try {
        const {bankcode, nuban} = values;
        // console.log({bankMap});
        const bank = bankMap[bankcode];
        // bankList.filter(({value}) => value == bankcode)[0]?.label ?? 'none';
        const data = {accountNumber: nuban, bankCode: bankcode};
        const addBankRes = await addBank(data);
        // try {
        //   await getUser();
        // } catch (error) {
        //   console.log({error});
        // }
        console.log({addBankRes});
        let message = addBankRes?.message;
        showSuccessSnackBar({text: message});
      } catch (error) {
        console.log({error});
        const message = extractErrorMessage(error);
        showErrorSnackBar({text: message});
      }
    },
    validationSchema: BankSchema,
  });
  // console.log({verifyAccount});
  // const {account, loading: getNameLoading, valid} = useVerifyBankAccount(
  //   true,
  //   values,
  //   verifyAccount,
  // );
  const setBankCodeValue = (str) => {
    setFieldTouched('bankcode', true);
    setFieldValue('bankcode', str);
  };
  return (
    <ModalContainer>
      <Box marginBottom="xxxl">
        <HeaderInfo text="ADD BANK" />
      </Box>

      <Box marginVertical="xs">
        <Select
          placeholder={data.addBankPlaceholder}
          items={bankList}
          value={values.bankcode}
          touched={touched.bankcode}
          error={errors.bankcode}
          onValueChange={setBankCodeValue}
          onClose={() => {
            setFieldTouched('bankcode', true);
          }}
        />
      </Box>
      <Box marginBottom="xs">
        <Input
          placeholder="Enter Account Number"
          variant="profilePrimary"
          placeholderTextColor={palette.fadedBrown}
          onChangeText={handleChange('nuban')}
          onBlur={handleBlur('nuban')}
          value={values.nuban}
          touched={touched.nuban}
          error={errors.nuban}
          nospace
        />
      </Box>
      <Box
        marginBottom="xs"
        backgroundColor="mostBg"
        padding="l"
        borderRadius={100}
        paddingHorizontal="xl">
        <Text color="primary" fontSize={15}>
          {user.name}
        </Text>
      </Box>
      <Box height={65} />
      <Box>
        <Button
          text="Save"
          loading={isSubmitting}
          onPress={handleSubmit}
          disabled={isSubmitting}
        />
      </Box>
    </ModalContainer>
  );
};

AddBank.propTypes = {
  close: PropTypes.func,
};
