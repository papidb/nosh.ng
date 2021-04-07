import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

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
import {useStore} from 'react-redux';

const ChangePassordSchema = Yup.object().shape({
  password: Yup.string().required('Required').min(4, 'Minimun length of 4'),
});

export const Security = ({close, changePassword, toggleBio}) => {
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
    initialValues: {password: '', confirmPassword: ''},
    onSubmit: async (submitValues) => {
      try {
        let response = await changePassword(submitValues);
        if (response && response?.message)
          showSuccessSnackBar({text: response?.message});
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
        <Text color="primary" fontSize={15}>
          Nnamdi Ayoola
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
            console.log('changed to : ', isOn);
          }}
        />
      </Box>
      {/* Form */}
      <Box marginBottom="xs">
        <Input
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          error={errors.password}
          touched={touched.password}
          value={values.password}
          placeholder="Enter New Password"
          variant="profilePrimary"
          placeholderTextColor={palette.blue}
          nospace
        />
      </Box>
      <Box marginBottom="xs">
        <Input
          onChangeText={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
          value={values.confirmPassword}
          placeholder="Confirm Password"
          variant="profilePrimary"
          placeholderTextColor={palette.blue}
          nospace
        />
      </Box>
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