import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import phone from 'phone';
import * as Yup from 'yup';

import {
  Box,
  Button,
  Text,
  Input,
  AuthContainer,
  AuthAvatar,
  RaiseAndroid,
} from 'components';
import {connect} from 'react-redux';
import {login, getUser} from 'action';
import {showErrorSnackBar, extractErrorMessage} from 'shared/utils';

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
  // name: Yup.string().required('Required'),
  email: Yup.string().trim().email('Invalid Email').required('Required'),
  password: Yup.string().required('Required').min(4, 'Minimun length of 4'),
  // phone: Yup.string().required('Required').validatePhone(),
});

const initailValues = __DEV__
  ? {
      name: 'omomo',
      email: 'benjamindaniel706@gmail.com',
      phone: '07018782712',
      password: 'Silver1@',
      confirm_password: 'omoioi',
    }
  : {name: '', email: '', phone: '', password: '', confirm_password: ''};

const LoginScreen = ({login, getUser}) => {
  const navigation = useNavigation();
  const toResetPassword = () => navigation.navigate('ResetPassword');
  const toEmailVerification = () => navigation.navigate('EmailVerification');
  const toRegister = () => navigation.navigate('Register');

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
        await login(submitValues);
        const userData = await getUser();
        console.log({userData});
        // console.log(me);
      } catch (error) {
        const text = extractErrorMessage(error);
        showErrorSnackBar({text});
      }
    },
    validationSchema: RegisterSchema,
  });

  const Bottom = (
    <Box
      justifyContent="flex-end"
      style={[styles.container]}
      marginTop={{bigScreen: 'xl', phone: 'l'}}>
      {/* Button */}
      <Box marginBottom="m">
        <Button
          text="Sign-In"
          loading={isSubmitting}
          disabled={isSubmitting || !isValid}
          onPress={handleSubmit}
        />
      </Box>
      <TouchableOpacity onPress={() => toRegister()}>
        <Text fontSize={14} textAlign="center">
          <Text color="primary">Don’t own an account? </Text>
          Register
        </Text>
      </TouchableOpacity>
      <RaiseAndroid height={20} />
    </Box>
  );
  return (
    <AuthContainer>
      <KeyboardAwareScrollView>
        <Box margin="s" marginTop="none" style={styles.container}>
          {/* Image */}
          <AuthAvatar
            size={135}
            imageProps={{
              style: {
                height: 110,
                width: 110,
                borderRadius: 110,
                resizeMode: 'contain',
              },
            }}
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
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            value={values.password}
            passwordIcon
          />
          {/* Agreement */}
          <Box marginBottom={{bigScreen: 'xl', phone: 'l'}} marginTop="xs">
            <TouchableOpacity onPress={() => toResetPassword()}>
              <Text fontSize={14} textAlign="right" style={styles.tandc}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
        {Bottom}
      </KeyboardAwareScrollView>
    </AuthContainer>
  );
};

export const Login = connect(null, {login, getUser})(LoginScreen);
// export const Login = LoginScreen;

const styles = StyleSheet.create({
  container: {marginHorizontal: 37},
  bottom: {marginTop: 20},
  tandc: {
    color: '#525C6B',
  },
});
