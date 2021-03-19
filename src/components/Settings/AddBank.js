import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {
  Box,
  Text,
  HeaderInfo,
  Input,
  Circle,
  Icon,
  Select,
  Button,
} from 'components';
import data from 'constants/data';
import {palette} from 'constants/theme';

const ModalContainer = ({children}) => {
  return <Box style={styles.modalContainer}>{children}</Box>;
};
const styles = StyleSheet.create({
  modalContainer: {padding: 22, paddingTop: 26},
});

export const AddBank = ({close}) => {
  return (
    <ModalContainer>
      <Box marginBottom="xxxl">
        <HeaderInfo text="ADD BANK" />
      </Box>

      <Box marginVertical="xs">
        <Select
          placeholder={data.addBankPlaceholder}
          onClose={console.log}
          onValueChange={(string) => console.log({string})}
          items={data.cardsubcategory}
        />
      </Box>
      <Box marginBottom="xs">
        <Input
          placeholder="Enter Account Number"
          placeholderTextColor={palette.blue}
          variant="profile"
          nospace
        />
      </Box>
      <Box
        marginBottom="xs"
        backgroundColor="mostBg"
        padding="l"
        borderRadius={100}
        paddingHorizontal="xl">
        <Text color="primary" fontSize={15}>
          Nnamdi Ayoola
        </Text>
      </Box>
      <Box height={65} />
      <Box>
        <Button text="Save" onPress={close} />
      </Box>
    </ModalContainer>
  );
};
