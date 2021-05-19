import React, {useState} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import {
  Box,
  Icon,
  Button,
  Text,
  Input,
  AuthHeader,
  AuthContainer,
  RaiseAndroid,
} from 'components';
import {waait} from 'shared/utils';

import {connect} from 'react-redux';
import {forgotPassword} from 'action';
import {
  showErrorSnackBar,
  showSuccessSnackBar,
  extractErrorMessage,
} from 'shared/utils';

const LoginSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid Email').required('Required'),
});

const initailValues = __DEV__
  ? {
      email: 'benjamindaniel706@gmail.com',
    }
  : {email: ''};

export const ResetPasswordScreen = ({forgotPassword}) => {
  const navigation = useNavigation();
  const toLogin = () => navigation.navigate('Login');
  const [text /** ,setText */] = useState('Please Enter a valid Email address');

  const headerHeight = 72;

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues: initailValues,
    onSubmit: async (submitValues) => {
      try {
        await forgotPassword(submitValues);
        showSuccessSnackBar({text: 'Check your mail!'});
        toLogin();
      } catch (error) {
        const text = extractErrorMessage(error);
        showErrorSnackBar({text});
      }
    },
    validationSchema: LoginSchema,
  });
  const Bottom = (
    <Box justifyContent="flex-end" style={[styles.container, styles.bottom]}>
      <Box marginBottom="m">
        <Button
          text="Reset Password"
          loading={isSubmitting}
          disabled={isSubmitting || !isValid}
          onPress={handleSubmit}
        />
      </Box>
      <RaiseAndroid height={20} />
    </Box>
  );
  return (
    <AuthContainer>
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        {/* Header */}
        <AuthHeader header="Oops!!!" />
        {/* bottom padding */}
        <Box
          flex={1}
          margin="s"
          marginTop={{bigScreen: 'xxxl', phone: 'xl'}}
          style={styles.container}>
          <Box marginBottom="m">
            <Text color="primary" textAlign="center">
              {text}
            </Text>
          </Box>
          <Input
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            value={values.email}
          />
        </Box>
        {Bottom}
      </KeyboardAwareScrollView>
    </AuthContainer>
  );
};
export const ResetPassword = connect(null, {forgotPassword})(
  ResetPasswordScreen,
);
const styles = StyleSheet.create({
  container: {marginHorizontal: 37},
  bottom: {marginTop: 125},
  tandc: {
    color: '#525C6B',
  },
});
