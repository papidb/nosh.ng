import React, {useState, useCallback} from 'react';
import {StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import phone from 'phone';
import * as Yup from 'yup';

import {Box, Circle, Button, Text, Input, AuthContainer} from 'components';

import {connect} from 'react-redux';
import {register} from 'action';
import {
  showErrorSnackBar,
  showSuccessSnackBar,
  extractErrorMessage,
} from 'shared/utils';
import {IS_ANDROID} from 'constants/config';

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
  phoneNumber: Yup.string().required('Required').validatePhone(),
});

const outer = {
  marginVertical: 'none',
  marginBottom: IS_ANDROID ? 'xs' : {phone: 's', bigScreen: 'm'},
};

const initailValues = __DEV__
  ? {
      name: 'Daniel Sikal',
      email: 'benjamindaniel706@gmail.com',
      password: 'Password123@',
      confirmPassword: 'Password123@',
      phoneNumber: '07012345678',
    }
  : {name: '', email: '', phoneNumber: '', password: '', confirmPassword: ''};

const RegisterScreen = ({register}) => {
  const navigation = useNavigation();
  const toLogin = () => navigation.navigate('Login');
  const toEmailVerification = () => navigation.navigate('EmailVerification');
  const [accepted, setAccepted] = useState(false);

  const toggleAccepted = useCallback(() => setAccepted(!accepted), [accepted]);

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
        let userData = await register(submitValues);
        if (userData && userData?.message)
          showSuccessSnackBar({text: userData?.message});
        toEmailVerification();
      } catch (error) {
        const text = extractErrorMessage(error);
        showErrorSnackBar({text});
      }
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
            outer={outer}
          />
          <Input
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            value={values.email}
            outer={outer}
          />
          <Input
            placeholder="Phone"
            keyboardType="phone-pad"
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            error={errors.phoneNumber}
            touched={touched.phoneNumber}
            value={values.phoneNumber}
            outer={outer}
          />
          <Input
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            value={values.password}
            passwordIcon
            outer={outer}
          />
          <Input
            placeholder="Confirm Password"
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            value={values.confirmPassword}
            passwordIcon
            outer={outer}
          />
          {/* Agreement */}
          <Pressable onPress={toggleAccepted}>
            <Box marginBottom="l" marginTop="m" flexDirection="row">
              <Circle
                size={32}
                backgroundColor="inactiveInputBorder"
                marginRight="m">
                <Circle
                  size={20}
                  backgroundColor={accepted ? 'primary' : 'white'}
                />
              </Circle>
              <Text fontSize={13} style={styles.tandc}>
                This means you agree to all our Terms and Conditions
              </Text>
            </Box>
          </Pressable>

          {/* Button */}
          <Box marginBottom="m">
            <Button
              text="Get Started"
              loading={isSubmitting}
              disabled={!accepted || isSubmitting || !isValid}
              onPress={handleSubmit}
            />
          </Box>
          <TouchableOpacity onPress={() => toLogin()}>
            <Text fontSize={13} textAlign="center">
              <Text color="primary" fontSize={13}>
                Already own an account?{' '}
              </Text>
              Login
            </Text>
          </TouchableOpacity>
        </Box>
      </KeyboardAwareScrollView>
    </AuthContainer>
  );
};

export const Register = connect(null, {register})(RegisterScreen);

const styles = StyleSheet.create({
  container: {marginHorizontal: 37},
  tandc: {
    color: '#525C6B',
  },
});
