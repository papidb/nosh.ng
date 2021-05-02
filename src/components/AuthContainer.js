import React from 'react';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {StatusBar, Platform} from 'react-native';

console.log('statusBarHeight: ', StatusBar.currentHeight);
import {Box, Text, Icon} from './pure';
import {hp} from 'shared/scale';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const AuthHeader = ({header = null, ...containerProps}) => {
  return (
    <Box>
      <Box
        width={200}
        alignSelf="flex-end"
        alignItems="center"
        marginTop="m"
        paddingVertical="m"
        paddingHorizontal="xl"
        backgroundColor="authHeaderBackground"
        right={-32}
        borderRadius={100}
        {...containerProps}>
        <Text color="primary" fontWeight="600" fontSize={20} lineHeight={25.44}>
          {header}
        </Text>
      </Box>
    </Box>
  );
};
AuthHeader.propTypes = {
  header: PropTypes.string,
};

export const AuthContainer = ({header = null, bottom, children}) => {
  // const headerHeight = 0;
  const {top, bottom: bottomHeight} = useSafeAreaInsets();
  // console.log(hp(72));
  const headerHeight = Platform.OS === 'ios' ? hp(72) : StatusBar.currentHeight;

  return (
    <Box flex={1} style={{marginBottom: bottomHeight}}>
      <Box
        alignItems="center"
        // marginBottom="m"
        // backgroundColor="success"
        style={{marginTop: headerHeight}}>
        <Icon name="icon-auth_logo" size={hp(60)} />
      </Box>

      {/* Header */}
      {header && <AuthHeader header={header} />}

      {/* children */}
      <>{children}</>

      {/* bottom padding */}
      {bottom}
    </Box>
  );
};

AuthContainer.propTypes = {
  header: PropTypes.string,
  bottom: PropTypes.object,
  children: PropTypes.func,
};
