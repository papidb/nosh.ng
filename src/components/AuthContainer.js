import React from 'react';
import {Image, ScrollView} from 'react-native';

import {Box, Text, Icon} from './pure';

export const AuthHeader = ({header = null}) => {
  return (
    <Box>
      <Box
        width={200}
        alignSelf="flex-end"
        alignItems="center"
        paddingVertical="m"
        paddingHorizontal="xl"
        backgroundColor="authHeaderBackground"
        right={-32}
        borderRadius={100}>
        <Text color="primary" fontWeight="600" fontSize={20} lineHeight={25.44}>
          {header}
        </Text>
      </Box>
    </Box>
  );
};

export const AuthContainer = ({header = null, bottom, children}) => {
  const headerHeight = 72;
  return (
    <ScrollView>
      <Box
        alignItems="center"
        marginBottom="l"
        style={{marginTop: headerHeight}}>
        <Icon name="icon-auth_logo" size={63} />
      </Box>

      {/* Header */}
      {header && <AuthHeader header={header} />}

      {/* children */}
      <>{children}</>

      {/* bottom padding */}
      <Box height={60} />
      <Box>{bottom}</Box>
    </ScrollView>
  );
};
