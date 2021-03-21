import React from 'react';

import PropTypes from 'prop-types';

import {Box, Text, HeaderInfo, Input, Select, Button} from 'components';
import data from 'constants/data';
import {palette} from 'constants/theme';

import {ModalContainer} from './ModalContainer';

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

AddBank.propTypes = {
  close: PropTypes.func,
};