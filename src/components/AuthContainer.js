import React from 'react';
import {Image, ScrollView} from 'react-native';

import {Box, Text, Icon} from './pure';

export const AuthContainer = ({header = null, children}) => {
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
      {header && (
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
            <Text
              color="primary"
              fontWeight="600"
              fontSize={20}
              lineHeight={25.44}>
              {header}
            </Text>
          </Box>
        </Box>
      )}

      {/* children */}
      <>{children}</>

      {/* bottom padding */}
      <Box height={60} />
    </ScrollView>
  );
};
