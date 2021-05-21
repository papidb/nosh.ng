/* eslint-disable react/no-unescaped-entities */
import React, {useEffect, useState} from 'react';
import {Alert, ActivityIndicator} from 'react-native';

import PropTypes from 'prop-types';

import * as Yup from 'yup';
import {useFormik} from 'formik';

import {
  Box,
  Text,
  Loading,
  HeaderInfo,
  Input,
  Select,
  Button,
} from 'components';
import data from 'constants/data';
import {palette} from 'constants/theme';
import {
  showErrorSnackBar,
  showSuccessSnackBar,
  extractErrorMessage,
  uuid,
} from 'shared/utils';
import {ModalContainer} from './ModalContainer';
import {connect, useStore, useSelector} from 'react-redux';
import {useVerifyBankAccount} from 'hooks';
import {BankTab} from './BankTab';
import {createStructuredSelector} from 'reselect';
import {selectPureUser} from 'selectors';
import {addBank, getBanks, getUser, deleteBank, verifyAccount} from 'action';
import {selectBanks, bankDeets} from 'selectors';

const BankSchema = Yup.object({
  bankcode: Yup.string().required('Required!').notOneOf(['Bank'], 'Required'),
  nuban: Yup.string().required('Required!').min(10, 'Invalid!'),
});

const initailValues = __DEV__
  ? {
      nuban: '',
      bankcode: '',
      // nuban: '0214956707',
      // bankcode: '058',
    }
  : {nuban: '', bankcode: ''};
const AddBankComponent = ({
  close,
  getUser,
  addBank,
  user,
  verifyAccount,
  deleteBank,
}) => {
  const [loading, setLoading] = useState(false);
  const banks = useSelector(selectBanks);
  const {bankList, bankMap} = useSelector(bankDeets);
  const thereIsBank = banks.length > 0;
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
        try {
          await getUser();
        } catch (error) {
          // console.log({error});
        }
        // console.log({addBankRes});
        let message = addBankRes?.message;
        showSuccessSnackBar({text: message});
        close();
      } catch (error) {
        console.log({error});
        const message = extractErrorMessage(error);
        showErrorSnackBar({text: message});
      }
    },
    validationSchema: BankSchema,
  });
  // console.log({verifyAccount});
  const [accountName, isVerifyingBankLoading] = useVerifyBankAccount(
    true,
    values,
    verifyAccount,
  );
  console.log({isVerifyingBankLoading});
  // console.log({valid, getNameLoading});
  const setBankCodeValue = (str) => {
    setFieldTouched('bankcode', true);
    setFieldValue('bankcode', str);
  };

  const confirmDeletion = (bank) => {
    console.log({bank});
    Alert.alert(
      `Delete Bank`,
      `${bank.accountName} ${bank.bankName}`,
      [
        {
          text: 'OK',
          onPress: async () => {
            setLoading(true);
            try {
              const res = await deleteBank(bank);
              await getUser();
              const text = res?.message ?? 'Successful';
              showSuccessSnackBar({text});
            } catch (error) {
              const text = extractErrorMessage(error);
              showErrorSnackBar({text});
            } finally {
              setLoading(false);
            }
          },
          style: 'destructive',
        },
        {
          text: 'Cancel',
          // onPress: () => console.log('Ask me later pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
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
          // autoFocus={true}
          placeholder="Enter Account Number"
          variant="profilePrimary"
          keyboardType="number-pad"
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
        backgroundColor="lightGray"
        padding="l"
        borderRadius={100}
        paddingHorizontal="xl">
        {isVerifyingBankLoading === 'true' ? (
          // <ActivityIndicator color="white" />
          <Text>Loading...</Text>
        ) : isVerifyingBankLoading === 'null' ? (
          <Text fontSize={15} color="error">
            Couldn't verify account
          </Text>
        ) : (
          <Text color="primary" fontSize={15} style={{color: '#0732A2'}}>
            {accountName}
          </Text>
        )}
      </Box>
      {thereIsBank && (
        <Box>
          <Text fontWeight="600" textAlign="right" marginVertical="xs">
            Available Bank Accounts
          </Text>
          {banks.map((bank) => {
            let deleteFn = () => confirmDeletion(bank);
            return (
              <BankTab
                key={uuid()}
                {...bank}
                {...{deletable: true, deleteFn}}
              />
            );
          })}
        </Box>
      )}
      <Box height={65} />
      <Box>
        <Button
          text="Save"
          loading={isSubmitting || loading}
          onPress={handleSubmit}
          disabled={isSubmitting || loading}
        />
      </Box>
    </ModalContainer>
  );
};

AddBankComponent.propTypes = {
  close: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: selectPureUser,
});

export const AddBank = connect(mapStateToProps, {
  addBank,
  getUser,
  deleteBank,
  verifyAccount,
})(AddBankComponent);
