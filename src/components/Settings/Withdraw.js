import React, {useCallback} from 'react';
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
  waait,
} from 'shared/utils';
import * as Yup from 'yup';

const minimumAcceptableAmount = 2000;
const AmountSchema = Yup.object().shape({
  amount: Yup.number().min(
    minimumAcceptableAmount,
    `Minimum amount of ${minimumAcceptableAmount}`,
  ),
});
export const Withdraw = ({close, withdraw, banks, thereIsBank}) => {
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
    initialValues: {amount: ''},
    onSubmit: async (values) => {
      console.log({values});
      try {
        const message = await withdraw({values, bankId: banks[0]?._id ?? null});
        console.log({message});
        showSuccessSnackBar({
          text: 'Withdrawal successful, we will get back to you!',
        });
      } catch (error) {
        const message = extractErrorMessage(error);
        showErrorSnackBar({text: message});
        close();
      }
    },
    validationSchema: AmountSchema,
  });
  const thumbIcon = useCallback(() => {
    return (
      <Box backgroundColor="mostBg">
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Icon name="icon-forward" size={14} />
        )}
      </Box>
    );
  }, [isSubmitting]);
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
      {thereIsBank ? (
        <Box>
          <BankTab {...banks[0]} />
        </Box>
      ) : (
        <Box>
          <Text textAlign="center" color="primary" fontWeight="600">
            Add banks to be able to withdraw
          </Text>
        </Box>
      )}
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
            title="SWIPE T0 WITHDRAW"
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
