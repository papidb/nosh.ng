import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {
  Box,
  Text,
  HeaderInfo,
  Input,
  Circle,
  Icon,
  AuthAvatar,
  Button,
} from 'components';

const ModalContainer = ({children}) => {
  return <Box style={styles.modalContainer}>{children}</Box>;
};
const styles = StyleSheet.create({
  modalContainer: {padding: 22, paddingTop: 26},
});

export const EditProfile = () => {
  return (
    <ModalContainer>
      <Box marginBottom="xs">
        <HeaderInfo text="EDIT PROFILE" />
      </Box>

      {/* Profile picture */}
      <Box flexDirection="row" alignItems="center" marginVertical="m">
        <TouchableOpacity onPress={() => {}}>
          <Box marginRight="xxs">
            <AuthAvatar
              size={81}
              containerProps={{
                alignSelf: 'flex-start',
                marginTop: 'none',
                marginBottom: 'none',
                backgroundColor: 'success',
              }}
              imageProps={{style: {height: 60, width: 60}}}
            />
            <Circle size={81} backgroundColor="overlayBg" position="absolute">
              <Icon name="icon-edit2" size={30} />
            </Circle>
          </Box>
        </TouchableOpacity>

        <Box marginLeft="m">
          <Text fontSize={14} fontWeight="bold" color="text">
            Edit profile photo
          </Text>
        </Box>
      </Box>
      {/* Form */}
      <Box marginBottom="xs">
        <Input placeholder="Name" variant="profile" editable={false} nospace />
      </Box>
      <Box marginBottom="xs">
        <Input
          placeholder="Number"
          variant="profile"
          editable={false}
          nospace
        />
      </Box>
      <Box marginBottom="xs">
        <Input placeholder="Email" variant="profile" editable={false} nospace />
      </Box>
      <Box>
        <Button text="Save" />
      </Box>
    </ModalContainer>
  );
};
