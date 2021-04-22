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
import {
  showErrorSnackBar,
  // showSuccessSnackBar,
  extractErrorMessage,
  requestFaceId,
} from 'shared/utils';
import * as Keychain from 'react-native-keychain';
import data from 'constants/data';

const BiometryTypes = data.BiometryTypes;
import {useBiometryType} from 'hooks';

const LoginSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid Email').required('Required'),
});

const initailValues = __DEV__
  ? {
      email: '',
      password: 'Silver1@',
    }
  : {email: '', password: ''};

export const PersonalLoginScreen = ({login, getUser, user, bio: BIOAPP}) => {
  const navigation = useNavigation();
  const toLogin = () => navigation.navigate('Login');
  const toResetPassword = () => navigation.navigate('ResetPassword');
  let bio = useBiometryType();

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    isSubmitting,
    isValid,
    setSubmitting,
  } = useFormik({
    initialValues: {...initailValues, email: user?.email},
    onSubmit: async (submitValues) => {
      try {
        const deets = await login(submitValues);
        // console.log({deets});
        const userData = await getUser();
        await requestFaceId();
        console.log({userData});
        // console.log(me);
      } catch (error) {
        const text = extractErrorMessage(error);
        showErrorSnackBar({text});
      }
    },
    validationSchema: LoginSchema,
  });
  const load = async () => {
    try {
      let options = {
        authenticationPrompt: {
          title: 'Authentication needed',
          subtitle: 'Subtitle',
          description: 'Some descriptive text',
          cancel: 'Cancel',
        },
      };
      return Keychain.getGenericPassword(options);
      // if (credentials) {
      //   console.log({credentials});
      // } else {
      // }
    } catch (err) {}
  };
  const getPassword = async () => {
    try {
      setSubmitting(true);
      let credentials = await load();
      console.log({credentials});
      let data = {
        // entry: 'ios',
        email: credentials.username,
        password: credentials.password,
      };

      const deets = await login(data);
      console.log({deets});
    } catch (error) {
      console.log({error});
      const message = extractErrorMessage(error);
      showErrorSnackBar({text: message});
    } finally {
      setSubmitting(false);
    }
  };
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
      <Box flexDirection="row" justifyContent="center" alignItems="center">
        <TouchableOpacity onPress={toResetPassword}>
          <Text fontSize={13} textAlign="center">
            <Text fontSize={13} color="primary">
              Forgot Password?
            </Text>
            {/* Register */}
          </Text>
        </TouchableOpacity>
        <Text>{' | '}</Text>
        <TouchableOpacity onPress={toLogin}>
          <Text fontSize={13} textAlign="center">
            <Text fontSize={13} color="buttonColor">
              Not You?{' '}
            </Text>
          </Text>
        </TouchableOpacity>
      </Box>

      <RaiseAndroid height={20} />
    </Box>
  );
  console.log(user?.avatar);
  return (
    <AuthContainer>
      <KeyboardAwareScrollView>
        <Box margin="none" marginTop="none" style={styles.container}>
          {/* Image */}
          <AuthAvatar
            avatar={user.avatar}
            size={120}
            imageProps={{
              style: {
                height: 105,
                width: 105,
                borderRadius: 105,
                resizeMode: 'contain',
              },
            }}
            imagePropsActive={{
              style: {
                height: 120,
                width: 120,
                borderRadius: 120,
                resizeMode: 'contain',
              },
            }}
          />
          <Box alignItems="center" marginBottom="m">
            <Text color="secondary" opacity={0.5} fontSize={12}>
              Welcome Back
            </Text>
            <Text
              color="buttonColor"
              fontFamily="Hurme Geometric Sans 2"
              fontWeight="600"
              fontSize={20}>
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
          <Box marginTop={{bigScreen: 'xl', phone: 's'}}>
            {/* {bio !== BiometryTypes.none && BIOAPP && (
              <Box alignItems="center">
                <TouchableOpacity>
                  <Box
                    alignSelf="center"
                    height={85}
                    width={85}
                    borderRadius={85}
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor="eyeBackground">
                    <Icon
                      name={
                        bio == 'FaceID' ? 'icon-faceid' : 'icon-fingerprint'
                      }
                      size={43}
                    />
                  </Box>
                </TouchableOpacity>
              </Box>
            )} */}
          </Box>
        </Box>
        {Bottom}
      </KeyboardAwareScrollView>
    </AuthContainer>
  );
};

PersonalLoginScreen.propTypes = {
  login: PropTypes.func,
};

export const PersonalLogin = connect(({user, misc: {bio}}) => ({user, bio}), {
  login,
  getUser,
})(PersonalLoginScreen);

const styles = StyleSheet.create({
  container: {marginHorizontal: 37},
  bottom: {marginTop: 30},
  tandc: {
    color: '#525C6B',
  },
});
