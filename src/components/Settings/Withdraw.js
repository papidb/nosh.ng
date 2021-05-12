import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';

import PropTypes from 'prop-types';

import {
  Box,
  Icon,
  Text,
  HeaderInfo,
  SwipeButton,
  Input,
  Divider,
  Button,
} from 'components';
import {palette} from 'constants/theme';

import {ModalContainer} from './ModalContainer';
import {BankTab} from './BankTab';
import {useFormik} from 'formik';

// import SwipeButton from 'rn-swipe-button';

import {
  showErrorSnackBar,
  showSuccessSnackBar,
  extractErrorMessage,
  uuid,
} from 'shared/utils';
import * as Yup from 'yup';
import {useSelector, useStore} from 'react-redux';

export const Withdraw = ({
  close,
  withdraw,
  getSettings,
  banks = [],
  thereIsBank,
  // minimumAcceptableAmount = 2002,
}) => {
  const minimumAcceptableAmount = useSelector(
    (state) => state.misc?.serverState?.minimumAmountWithdrawable,
  );
  console.log({minimumAcceptableAmount});
  useEffect(() => {
    getSettings();
  }, [getSettings]);
  const [selected, setSelected] = useState(null);

  const Banks = useCallback(() => {
    return (
      <>
        {thereIsBank ? (
          <Box>
            {banks.map((bank) => (
              <BankTab key={uuid()} {...bank} {...{selected, setSelected}} />
            ))}
          </Box>
        ) : (
          <Box>
            <Text textAlign="center" color="primary" fontWeight="600">
              Add banks to be able to withdraw
            </Text>
          </Box>
        )}
      </>
    );
  }, [banks, selected, thereIsBank]);
  const validate = (
    values,
    props /* only available when using withFormik */,
  ) => {
    const errors = {};

    if (!values.amount) {
      errors.amount = 'Required';
    } else if (values.amount < minimumAcceptableAmount) {
      errors.amount = `Minimum amount of ${minimumAcceptableAmount}`;
    }

    return errors;
  };
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
    validate,
    initialValues: {amount: ''},
    onSubmit: async (values) => {
      try {
        const message = await withdraw({
          amount: Number(values.amount),
          bankId: selected,
        });
        showSuccessSnackBar({
          text: 'Withdrawal successful, we will get back to you!',
        });
      } catch (error) {
        const message = extractErrorMessage(error);
        showErrorSnackBar({text: message});
      } finally {
        close();
      }
    },
    // validationSchema: AmountSchema,
  });
  return (
    <ModalContainer>
      <Box marginBottom="xl">
        <HeaderInfo text="ENTER AMOUNT TO WITHDRAW" />
      </Box>
      <Divider />

      <Box marginBottom="m" marginTop="m">
        <Input
          variant="giftcard"
          placeholder="0.00"
          keyboardType="number-pad"
          RightIcon={
            <Text fontSize={12} fontWeight="600" color="success">
              NGN
            </Text>
          }
          inputStyle={{color: palette.green}}
          innerContainerProps={{
            backgroundColor: 'mostBg',
            height: 75,
            borderRadius: 100,
          }}
          onChangeText={handleChange('amount')}
          onBlur={handleBlur('amount')}
          error={errors.amount}
          touched={touched.amount}
          value={values.amount}
          placeholderTextColor={palette.green}
        />
      </Box>
      <Banks />
      <Box height={25} />
      <Divider />
      <Box height={25} />
      <Box>
        {/* <Button
          text="Withdraw"
          loading={isSubmitting}
          onPress={handleSubmit}
          disabled={isSubmitting}
        /> */}
        <Box alignItems="center" marginBottom="s">
          <SwipeButton
            title="SWIPE TO WITHDRAW"
            // thumbIcon={thumbIcon}
            {...{loading: isSubmitting}}
            onToggle={handleSubmit}
          />
        </Box>
        {/* <Box alignItems="center">
          <SwipeButton
            // disabled={isSubmitting}
            //disable the button by doing true (Optional)
            swipeSuccessThreshold={70}
            height={58}
            containerStyles={{borderWidth: 5}}
            //height of the button (Optional)
            width={'95%'}
            //width of the button (Optional)
            title="SWIPE T0 WITHDRAW"
            //Text inside the button (Optional)
            thumbIconComponent={thumbIcon}
            //You can also set your own icon for the button (Optional)
            onSwipeSuccess={handleSubmit}
            successTitle="loading"
            //After the completion of swipe (Optional)
            railFillBackgroundColor="#3DAA9D" //(Optional)
            railFillBorderColor="#3DAA9D" //(Optional)
            thumbIconBackgroundColor="rgba(61,170,157, 0.1)" //(Optional)
            shouldResetAfterSuccess
            // thumbIconBorderColor="#ed9aff" //(Optional)
            railBackgroundColor="#023248" //(Optional)
            railBorderColor="transparent" //(Optional)
            titleColor="#3DAA9D"
            titleStyles={{color: '#3DAA9D', textAlign: 'right', fontSize: 12}}
          />
        </Box>
        */}
      </Box>
    </ModalContainer>
  );
};

Withdraw.propTypes = {
  close: PropTypes.func,
};

// // selectMinimumWithdrawalableAmount
// export const withdraw =connect(, {})(WithdrawComponent)
