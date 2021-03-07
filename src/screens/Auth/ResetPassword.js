import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
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
  AuthAvatar,
  AuthContainer,
  AuthHeader,
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
  const [text, setText] = useState('Please Enter a valid Email address');

  const headerHeight = 72;

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    isSubmitting,
    setSubmitting,
    isValid,
  } = useFormik({
    initialValues: initailValues,
    onSubmit: async (values) => {
      console.log({values});
      await waait(2000);
      toLogin();
    },
    validationSchema: LoginSchema,
  });
  const Bottom = (
    <Box justifyContent="flex-end" style={[styles.container, styles.bottom]}>
      <Box marginTop="xxxl" />
      <Box marginTop="xxxl" />
      {/* Button */}
      <Box marginBottom="m">
        <Button
          text="Reset Password"
          loading={isSubmitting}
          disabled={isSubmitting || !isValid}
          onPress={handleSubmit}
        />
      </Box>
    </Box>
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
        <Box height={60} />
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
