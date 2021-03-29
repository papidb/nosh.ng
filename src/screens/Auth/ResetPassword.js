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

const LoginSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid Email').required('Required'),
});

const initailValues = __DEV__
  ? {
      email: 'benjamindaniel706@gmail.com',
    }
  : {email: ''};

export const ResetPasswordScreen = () => {
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
      console.log({submitValues});
      await waait(2000);
      toLogin();
    },
    validationSchema: LoginSchema,
  });
  const Bottom = (
    <Box justifyContent="flex-end" style={[styles.container, styles.bottom]}>
      {Platform.OS == 'ios' && (
        <Box marginTop={{bigScreen: 'xxxl', phone: 'xl'}} />
      )}
      <Box marginTop={{bigScreen: 'xxxl', phone: 'xl'}} />
      {/* Button */}
      <Box marginBottom="m">
        <Button
          text="Reset Password"
          loading={isSubmitting}
          disabled={isSubmitting || !isValid}
          onPress={handleSubmit}
        />
      </Box>
      <RaiseAndroid />
    </Box>
  );
  return (
    <AuthContainer bottom={Bottom}>
      <KeyboardAwareScrollView>
        {/* Header */}
        <AuthHeader header="Oops!!!" />
        {/* bottom padding */}
        <Box
          margin="s"
          marginTop={{bigScreen: 'xxxl', phone: 'xl'}}
          style={styles.container}>
          <Box marginBottom="m">
            <Text color="primary" textAlign="center">
              {text}
            </Text>
          </Box>
          <Input
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            value={values.email}
          />
        </Box>
      </KeyboardAwareScrollView>
    </AuthContainer>
  );
  return (
    <Box flex={1}>
      <Box flex={1}>
        <KeyboardAwareScrollView>
          <Box
            alignItems="center"
            marginBottom="l"
            style={{marginTop: headerHeight}}>
            <Icon name="icon-auth_logo" size={63} />
          </Box>
          {/* Header */}
          <AuthHeader header="Oops!!!" />
          {/* bottom padding */}
          <Box margin="s" marginTop="xxxl" style={styles.container}>
            <Box marginBottom="m">
              <Text color="primary" textAlign="center">
                {text}
              </Text>
            </Box>
            <Input
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
              touched={touched.email}
              value={values.email}
            />
          </Box>
        </KeyboardAwareScrollView>
        {Bottom}
        {/* <Box height={60} /> */}
      </Box>
    </Box>
  );
};
export const ResetPassword = ResetPasswordScreen;
const styles = StyleSheet.create({
  container: {marginHorizontal: 37},
  bottom: {marginTop: 125},
  tandc: {
    color: '#525C6B',
  },
});
