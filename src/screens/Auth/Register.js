import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import phone from 'phone';
import * as Yup from 'yup';

import {Box, Button, Text, Input, AuthContainer} from 'components';

import {waait} from 'shared/utils';

Yup.addMethod(Yup.string, 'validatePhone', function () {
  return this.test({
    name: 'phone',
    message: 'Phone is not valid',
    test: (postcode = '') => {
      // let prefix = '+234';
      // const value = prefix + postcode;
      let values = phone(postcode, 'NG');
      return values.length === 2;
    },
  });
});

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().trim().email('Invalid Email').required('Required'),
  password: Yup.string().required('Required').min(4, 'Minimun length of 4'),
  phone: Yup.string().required('Required').validatePhone(),
});

const initailValues = __DEV__
  ? {
      name: 'omomo',
      email: 'benjamindaniel706@gmail.com',
      phone: '07018782712',
      password: 'oomom',
      confirm_password: 'omoioi',
    }
  : {name: '', email: '', phone: '', password: '', confirm_password: ''};

const RegisterScreen = ({}) => {
  const navigation = useNavigation();
  const toLogin = () => navigation.navigate('Login');
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
      //   toLogin();
    },
    validationSchema: RegisterSchema,
  });
  return (
    <AuthContainer header="Register">
      <KeyboardAwareScrollView>
        <Box margin="s" style={styles.container}>
          <Input
            placeholder="Name"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            error={errors.name}
            touched={touched.name}
            value={values.name}
          />
          <Input
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            value={values.email}
          />
          <Input
            placeholder="Phone"
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            error={errors.phone}
            touched={touched.phone}
            value={values.phone}
          />
          <Input
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            value={values.password}
            passwordIcon
          />
          <Input
            placeholder="Confirm Password"
            onChangeText={handleChange('confirm_password')}
            onBlur={handleBlur('confirm_password')}
            error={errors.confirm_password}
            touched={touched.confirm_password}
            value={values.confirm_password}
            passwordIcon
          />
          {/* Agreement */}
          <Box marginBottom="xl" marginTop="l">
            <Text fontSize={13} style={styles.tandc}>
              This means you agree to all our Terms and Conditions
            </Text>
          </Box>
          {/* Button */}
          <Box marginBottom="m">
            <Button
              text="Get Started"
              loading={isSubmitting}
              disabled={isSubmitting || !isValid}
              onPress={handleSubmit}
            />
          </Box>
          <TouchableOpacity onPress={() => toLogin()}>
            <Text fontSize={14} textAlign="center">
              <Text color="primary">Already own an account? </Text>
              Login
            </Text>
          </TouchableOpacity>
        </Box>
      </KeyboardAwareScrollView>
    </AuthContainer>
  );
};

export const Register = RegisterScreen;

const styles = StyleSheet.create({
  container: {marginHorizontal: 37},
  tandc: {
    color: '#525C6B',
  },
});
