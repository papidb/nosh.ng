import React, {useState} from 'react';
import {
  ViewPropTypes,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Box, Text, Icon} from 'components';
import {AuthAvatar} from './auth';
import {getMessage} from 'shared/utils';
import Modal from 'react-native-modal';
import {NotificationModal} from './NotificationModal';
import {useSelector, useStore} from 'react-redux';
import {palette} from 'constants/theme';

const HeaderComponent = ({onPress, bright, ...props}) => {
  // const {user} = useStore().getState();
  const user = useSelector((state) => state.user);

  // const {top} = useSafeAreaInsets();
  const {top, bottom: bottomHeight} = useSafeAreaInsets();
  const headerHeight = Platform.OS === 'ios' ? top : 0; // top / 4 + 10; // StatusBar.currentHeight;
  let realTop = top / 4 + 10;
  const [isModalVisible, setModalVisible] = useState(false);

  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

  return (
    <Box
      flexDirection="row"
      // backgroundColor="mostBg"
      paddingHorizontal="l"
      style={{
        paddingTop: headerHeight,
        // backgroundColor: palette.mostBgPure
      }}
      //
    >
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => closeModal()}
        style={{marginHorizontal: 20}}>
        <NotificationModal {...{closeModal}} />
      </Modal>
      <Box marginRight="m">
        <AuthAvatar
          size={81}
          avatar={user.avatar}
          containerProps={{marginTop: 's', style: {marginBottom: 6}}}
          imageProps={{
            style: {
              height: 65,
              width: 65,
              borderRadius: 65,
              resizeMode: 'contain',
            },
          }}
          imagePropsActive={{
            style: {
              height: 81,
              width: 81,
              borderRadius: 81,
              resizeMode: 'contain',
            },
          }}
        />
      </Box>
      {/* Remaining */}
      <Box flex={1} alignSelf="flex-end" marginBottom="s">
        <Text color="primary" fontSize={12}>
          {/* Good Morning */}
          {getMessage()}
        </Text>
        <Text
          fontWeight="600"
          color={bright ? 'white' : 'buttonColor'}
          // fontWeight="600"
          lineHeight={30}
          fontSize={20}>
          {/* {generateReadableName(user)} */}
          {user.name}
        </Text>
      </Box>
      <Box alignSelf="flex-start" top={1.5 * realTop}>
        <TouchableOpacity {...{onPress: openModal}}>
          <Icon name="icon-notification" size={40} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export const HeaderInfo = ({text, containerProps, textProps}) => {
  return (
    <Box
      padding="m"
      height={38}
      alignItems="center"
      justifyContent="center"
      borderRadius={100}
      backgroundColor="mostBg"
      {...containerProps}>
      <Text
        fontWeight="600"
        color="primary"
        textAlign="center"
        fontSize={11}
        {...textProps}>
        {text}
      </Text>
    </Box>
  );
};

export const Header = HeaderComponent;
HeaderInfo.propTypes = {
  text: PropTypes.string,
  textProps: ViewPropTypes.style,
  containerProps: ViewPropTypes.style,
};
