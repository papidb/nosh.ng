import React from 'react';

import PropTypes from 'prop-types';

import {Box, Text, HeaderInfo, Input, Divider, Button} from 'components';
import {palette} from 'constants/theme';

import {ModalContainer} from './ModalContainer';
import {BankTab} from './BankTab';

export const Withdraw = ({close}) => {
  return (
    <ModalContainer>
      <Box marginBottom="xl">
        <HeaderInfo text="ENTER AMOUNT TO WITHDRAW" />
      </Box>
      <Divider />

      <Box marginBottom="m" marginTop="m">
        <Input
          variant="giftcard"
          placeholder="0.00"
          keyboardType="number-pad"
          RightIcon={
            <Text fontSize={12} fontWeight="600" color="success">
              NGN
            </Text>
          }
          inputStyle={{color: palette.green}}
          innerContainerProps={{
            backgroundColor: 'mostBg',
            height: 75,
            borderRadius: 100,
          }}
          placeholderTextColor={palette.green}
        />
      </Box>
      <Box>
        <BankTab />
      </Box>
      <Box height={32} />
      <Divider />
      <Box height={40} />
      <Box>
        <Button
          text="SWIPE TO WITHDRAW"
          textVariant="buttonSwipe"
          onPress={close}
        />
      </Box>
    </ModalContainer>
  );
};

Withdraw.propTypes = {
  close: PropTypes.func,
};
