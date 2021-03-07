import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
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
} from 'components';
import {waait} from 'shared/utils';

const LoginSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid Email').required('Required'),
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

export const PersonalLoginScreen = () => {
  const navigation = useNavigation();
  const toLogin = () => navigation.navigate('Login');
  const toResetPassword = () => navigation.navigate('ResetPassword');

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
      {/* Button */}
      <Box marginBottom="m">
        <Button
          text="Sign-In"
          loading={isSubmitting}
          disabled={isSubmitting || !isValid}
          onPress={handleSubmit}
        />
      </Box>
      <TouchableOpacity onPress={() => toResetPassword()}>
        <Text fontSize={14} textAlign="center">
          <Text color="primary">Forgot Password? </Text>
          {/* Register */}
        </Text>
      </TouchableOpacity>
    </Box>
  );
  return (
    <AuthContainer bottom={Bottom}>
      <KeyboardAwareScrollView>
        <Box margin="s" marginTop="none" style={styles.container}>
          {/* Image */}
          <AuthAvatar />
          <Box alignItems="center" marginBottom="m">
            <Text color="secondary" opacity={0.5} fontSize={16}>
              Welcome Back
            </Text>
            <Text color="buttonColor" fontWeight="700" fontSize={24}>
              Nnamdi
            </Text>
          </Box>
          <Input
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            value={values.password}
            passwordIcon
          />
          <Box
            marginTop={'xl'}
            alignSelf="center"
            height={85}
            width={85}
            borderRadius={85}
            alignItems="center"
            justifyContent="center"
            backgroundColor="eyeBackground">
            <Icon name="icon-fingerprint" size={43} />
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    </AuthContainer>
  );
};
export const PersonalLogin = PersonalLoginScreen;
const styles = StyleSheet.create({
  container: {marginHorizontal: 37},
  bottom: {marginTop: 50},
  tandc: {
    color: '#525C6B',
  },
});
