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

export const AddBank = () => {
  return (
    <ModalContainer>
      <Box marginBottom="xxxl">
        <HeaderInfo text="ADD BANK" />
      </Box>

      <Box marginVertical="xs">
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
