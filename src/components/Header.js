import React, {useState} from 'react';
import {ViewPropTypes, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Box, Text, Icon} from 'components';
import {AuthAvatar} from './auth';
import {getMessage} from 'shared/utils';
import Modal from 'react-native-modal';
import {NotificationModal} from './NotificationModal';
import {connect, useStore} from 'react-redux';
import {palette} from 'constants/theme';

const HeaderComponent = ({onPress, bright, ...props}) => {
  const {user} = useStore().getState();
  // const user = {
  //   firstName: 'John',
  //   lastName: 'Doe',
  // };
  const {top} = useSafeAreaInsets();
  // console.log({top});
  let realTop = top / 4 + 10;
  const [isModalVisible, setModalVisible] = useState(false);

  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

  return (
    <Box
      flexDirection="row"
      // backgroundColor="mostBg"
      paddingHorizontal="l"
      // paddingTop="m"
      style={{
        paddingTop: realTop,
        // backgroundColor: palette.mostBgPure
      }}
      //
    >
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => closeModal()}
        style={{marginHorizontal: 40}}>
        <NotificationModal {...{closeModal}} />
      </Modal>
      <Box marginRight="m">
        <AuthAvatar
          size={81}
          avatar={user.avatar}
          // containerProps={{alignSelf: 'flex-start', margin: 'none'}}
          imageProps={{style: {height: 50, width: 50, borderRadius: 50}}}
          imagePropsActive={{style: {height: 81, width: 81, borderRadius: 81}}}
        />
      </Box>
      {/* Remaining */}
      <Box flex={1} alignSelf="center">
        <Text
          // fontFamily="Hurme Geometric Sans 2 Bold"
          color="primary"
          fontSize={14}>
          {/* Good Morning */}
          {getMessage()}
        </Text>
        <Text
          // fontFamily="Hurme Geometric Sans 2 Bold"
          color={bright ? 'white' : 'buttonColor'}
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
        // fontFamily="Hurme Geometric Sans 2 Bold"
        color="primary"
        textAlign="center"
        fontWeight="500"
        fontSize={12}
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
