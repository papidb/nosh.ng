import React from 'react';
import {Close, Box, Text, Divider, Input, Button} from 'components';
import {palette} from 'constants/theme';

import {ModalContainer} from 'components/Settings';

export const UserNameSetup = ({close = () => {}}) => {
  return (
    <ModalContainer>
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
        placeholderTextColor={palette.blue}
        placeholder="Username"
        innerContainerProps={{borderWidth: 0, backgroundColor: 'mostBg'}}
      />

      <Box marginVertical="l">
        <Button text="Save" color="primary" textVariant="darkButton" />
      </Box>
    </ModalContainer>
  );
};
