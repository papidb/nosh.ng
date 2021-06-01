import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {Close, Box, Text, Divider, Input, Button} from 'components';
import {palette} from 'constants/theme';

import {ModalContainer} from 'components/Settings';
import {connect} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {updateUsername, getUser} from 'action';

import {
  showErrorSnackBar,
  showSuccessSnackBar,
  extractErrorMessage,
} from 'shared/utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const UsernameSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'You can choose a username with a minimum value of 5')
    .required('Required'),
});

const UserNameSetupComponent = ({
  pureClose = () => {},
  close = () => {},
  updateUsername,
  getUser,
}) => {
  const {
    errors,
    values,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {username: ''},
    onSubmit: async (values) => {
      try {
        const res = await updateUsername(values);
        try {
          await getUser();
        } catch (error) {}
        const text = res?.message ?? 'Username set successfully';
        showSuccessSnackBar({text});
        pureClose();
      } catch (error) {
        const text = extractErrorMessage(error);
        showErrorSnackBar({text});
        console.log({error});
      }
    },
    validationSchema: UsernameSchema,
  });
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'android' ? undefined : 'position'}
      //
    >
      <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
        <ModalContainer
          flex={1}
          backgroundColor={'buttonColor'}
          borderTopLeftRadius={38}
          borderTopRightRadius={38}>
          <Close
            onPress={close}
            circleProps={{borderColor: 'fadedDarkBlueButton'}}
            closeProps={{
              fill: palette.white,
            }}
          />
          <Box marginTop="l" marginBottom="xl">
            <Text
              color="primary"
              textAlign="center"
              fontSize={14}
              fontWeight="600">
              SET UP ONE-TIME USERNAME
            </Text>
          </Box>
          <Divider />

          <Box marginTop="l" style={{marginHorizontal: 41}}>
            <Text color="white" textAlign="center">
              This Username is unique and can’t be changed in the future, so we
              advise you make it count, Goodluck!
            </Text>
          </Box>
          <Box marginBottom="xl" marginTop="xl">
            <Divider />
          </Box>
          <Input
            keyboardType="default"
            placeholderTextColor={palette.blue}
            placeholder="Username"
            innerContainerProps={{borderWidth: 0, backgroundColor: 'mostBg'}}
            inputStyle={{color: palette.blue}}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            error={errors.username}
            touched={touched.username}
            value={values.username}
          />

          <Box marginVertical="l">
            <Button
              text="Save"
              color="primary"
              textVariant="darkButton"
              loading={isSubmitting}
              disabled={isSubmitting}
              onPress={handleSubmit}
            />
          </Box>
        </ModalContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const UserNameSetup = connect(null, {updateUsername, getUser})(
  UserNameSetupComponent,
);
