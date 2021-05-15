import React, {useState} from 'react';
import {Keyboard} from 'react-native';

import {useFormik} from 'formik';
import PropTypes from 'prop-types';
import ToggleSwitch from 'toggle-switch-react-native';
import * as Yup from 'yup';

import {
  Box,
  Text,
  HeaderInfo,
  Input,
  Circle,
  Icon,
  AuthAvatar,
  Button,
  Divider,
} from 'components';
import {palette} from 'constants/theme';
import {ModalContainer} from './ModalContainer';
import {
  showErrorSnackBar,
  showSuccessSnackBar,
  extractErrorMessage,
} from 'shared/utils';
import {useStore, useDispatch} from 'react-redux';
import {LOGOUT} from 'action/type';
import Snackbar from 'react-native-snackbar';

const ChangePassordSchema = Yup.object().shape({
  newPassword: Yup.string().required('Password is required'),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), null],
    'Passwords must match',
  ),
});

const outer = {marginVertical: 'xxs'};
const initialValues = __DEV__
  ? {
      oldPassword: 'Silver1@',
      newPassword: 'Silver1@',
      confirmNewPassword: 'Silver1@',
    }
  : {oldPassword: '', newPassword: '', confirmNewPassword: ''};

export const Security = ({close = () => {}, changePassword, toggleBio}) => {
  const dispatch = useDispatch();
  const logout = () => dispatch({type: LOGOUT});
  const {
    misc: {bio: reduxBio},
  } = useStore().getState();
  const [bio, setBio] = useState(reduxBio);

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
    initialValues,
    onSubmit: async (submitValues) => {
      try {
        let response = await changePassword(submitValues);
        if (response && response?.message)
          showSuccessSnackBar({text: response?.message});
        close();
        logout();
        // toEmailVerification();
      } catch (error) {
        const text = extractErrorMessage(error);
        console.log({text});
        showErrorSnackBar({text});
      }
    },
    validationSchema: ChangePassordSchema,
  });
  return (
    <ModalContainer>
      <Box marginBottom="xs">
        <HeaderInfo text="SECURITY SETTINGS" />
        <Box style={{marginTop: 28}}>
          <Divider />
        </Box>
      </Box>
      {/* FaceId */}
      <Box
        marginBottom="xs"
        backgroundColor="lightGray"
        // padding="l"
        height={47}
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        borderRadius={100}
        paddingHorizontal="xl"
        paddingRight="m">
        <Text color="primary" fontSize={15} fontWeight="600">
          Biometrics
        </Text>
        <ToggleSwitch
          isOn={bio}
          onColor="rgba(48,188,237,0.15)"
          offColor="rgba(188,188,188,0.15)"
          thumbOffStyle={{backgroundColor: '#BCBCBC'}}
          thumbOnStyle={{backgroundColor: 'rgba(48,188,237,1)'}}
          size="medium"
          onToggle={(isOn) => {
            toggleBio();
            setBio(isOn);
            showSuccessSnackBar({
              text: `Toggled biometrics ${isOn ? 'on' : 'off'}`,
              duration: Snackbar.LENGTH_SHORT,
            });
            console.log('changed to : ', isOn);
          }}
        />
      </Box>
      <Divider />
      <Box style={{marginVertical: 17}}>
        <Text
          fontSize={12}
          fontWeight="600"
          textAlign="center"
          style={{color: '#A9A9A9'}}>
          CHANGE PASSWORD
        </Text>
      </Box>

      {/* Form */}
      <Box marginBottom="xs">
        <Input
          onChangeText={handleChange('oldPassword')}
          onBlur={handleBlur('oldPassword')}
          error={errors.oldPassword}
          touched={touched.oldPassword}
          value={values.oldPassword}
          placeholder="Enter Old Password"
          variant="profilePrimary"
          placeholderTextColor={palette.blue}
          passwordIcon={!__DEV__}
          outer={outer}
          blurOnSubmit={false}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <Input
          onChangeText={handleChange('newPassword')}
          onBlur={handleBlur('newPassword')}
          error={errors.newPassword}
          touched={touched.newPassword}
          value={values.newPassword}
          placeholder="Enter New Password"
          variant="profilePrimary"
          placeholderTextColor={palette.blue}
          passwordIcon={!__DEV__}
          outer={outer}
          blurOnSubmit={false}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <Input
          onChangeText={handleChange('confirmNewPassword')}
          onBlur={handleBlur('confirmNewPassword')}
          error={errors.confirmNewPassword}
          touched={touched.confirmNewPassword}
          value={values.confirmNewPassword}
          placeholder="Enter New Password"
          variant="profilePrimary"
          placeholderTextColor={palette.blue}
          passwordIcon={!__DEV__}
          outer={outer}
          blurOnSubmit={false}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
      </Box>
      <Box marginBottom="xs"></Box>
      <Box>
        <Button text="Save" loading={isSubmitting} onPress={handleSubmit} />
      </Box>
    </ModalContainer>
  );
};

Security.propTypes = {
  close: PropTypes.func,
  changePassword: PropTypes.func,
};
