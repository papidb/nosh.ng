import React from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';

import {Box, Button, Text, AuthContainer, RaiseAndroid} from 'components';

import MailBox from 'assets/svgs/MailBox.svg';

const EmailVerificationScreen = ({}) => {
  const navigation = useNavigation();

  const toLogin = () => navigation.navigate('Login');

  const Bottom = (
    <Box justifyContent="flex-end" style={[styles.container, styles.bottom]}>
      {/* Button */}
      <Box marginBottom="m">
        <Button
          text="Verified? Hop-in"
          variant="faded"
          textVariant="buttonDisabled"
          onPress={() => toLogin()}
        />
      </Box>
      <RaiseAndroid />
    </Box>
  );
  return (
    <AuthContainer bottom={Bottom}>
      <KeyboardAwareScrollView>
        <Box margin="s" marginVertical="xxxl" style={styles.container}>
          {/* Image */}
          <Box right={-113}>
            <MailBox />
          </Box>
          <Box marginTop="l">
            <Text textAlign="center" color="secondary" opacity={0.5}>
              A verification email has been sent to you
            </Text>
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    </AuthContainer>
  );
};

export const EmailVerification = EmailVerificationScreen;

const styles = StyleSheet.create({
  container: {marginHorizontal: 37},
  bottom: {marginTop: 130},
  tandc: {
    color: '#525C6B',
  },
});
