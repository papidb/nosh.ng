import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';

import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {connect} from 'react-redux';

import {
  Box,
  Icon,
  Button,
  Text,
  Input,
  AuthAvatar,
  AuthContainer,
  RaiseAndroid,
} from 'components';
import {getUser, login} from 'action';
import {showErrorSnackBar, extractErrorMessage} from 'shared/utils';

const LoginSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid Email').required('Required'),
});

const initailValues = __DEV__
  ? {
      email: '',
      password: 'Silver1@',
    }
  : {email: '', password: ''};

export const PersonalLoginScreen = ({login, getUser, user}) => {
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
    initialValues: {...initailValues, email: user?.email},
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
      <Box flexDirection="row" justifyContent="center">
        <TouchableOpacity onPress={toResetPassword}>
          <Text fontSize={14} textAlign="center">
            <Text color="primary">Forgot Password?</Text>
            {/* Register */}
          </Text>
        </TouchableOpacity>
        <Text>{' | '}</Text>
        <TouchableOpacity onPress={toLogin}>
          <Text fontSize={14} textAlign="center">
            <Text color="buttonColor">Not You? </Text>
          </Text>
        </TouchableOpacity>
      </Box>

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
          <Box alignItems="center" marginBottom="m">
            <Text color="secondary" opacity={0.5} fontSize={16}>
              Welcome Back
            </Text>
            <Text
              color="buttonColor"
              fontFamily="Hurme Geometric Sans 2 Bold"
              fontSize={24}>
              {user?.name}
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
          <TouchableOpacity>
            <Box
              marginTop={{bigScreen: 'xl', phone: 's'}}
              alignSelf="center"
              height={85}
              width={85}
              borderRadius={85}
              alignItems="center"
              justifyContent="center"
              backgroundColor="eyeBackground">
              <Icon name="icon-fingerprint" size={43} />
            </Box>
          </TouchableOpacity>
        </Box>
        {Bottom}
      </KeyboardAwareScrollView>
    </AuthContainer>
  );
};

PersonalLoginScreen.propTypes = {
  login: PropTypes.func,
};

export const PersonalLogin = connect(({user}) => ({user}), {login, getUser})(
  PersonalLoginScreen,
);

const styles = StyleSheet.create({
  container: {marginHorizontal: 37},
  bottom: {marginTop: 10},
  tandc: {
    color: '#525C6B',
  },
});
