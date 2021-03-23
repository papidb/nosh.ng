import React, {useState} from 'react';
import {ViewPropTypes, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Box, Text, Icon} from './pure';
import {AuthAvatar} from './auth';
import {generateReadableName} from 'shared/utils';
import Modal from 'react-native-modal';
import {NotificationModal} from './NotificationModal';

export const Header = ({onPress}) => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
  };
  const {top} = useSafeAreaInsets();
  // console.log({top});
  let realTop = top / 4 + 10;
  const [isModalVisible, setModalVisible] = useState(false);

  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

  return (
    <Box
      flexDirection="row"
      backgroundColor="mostBg"
      paddingHorizontal="l"
      // paddingTop="m"
      style={{paddingTop: realTop}}
      //
    >
      <Modal isVisible={isModalVisible} onBackdropPress={() => closeModal()}>
        <NotificationModal {...{closeModal}} />
      </Modal>
      <Box marginRight="m">
        <AuthAvatar
          size={81}
          containerProps={{alignSelf: 'flex-start', margin: 'none'}}
          imageProps={{style: {height: 50, width: 50}}}
        />
      </Box>
      {/* Remaining */}
      <Box flex={1} alignSelf="center">
        <Text color="primary" fontWeight="bold" fontSize={14}>
          Good Morning
        </Text>
        <Text color="buttonColor" fontWeight="bold" fontSize={20}>
          {generateReadableName(user)}
        </Text>
      </Box>
      <Box alignSelf="flex-start" top={1.5 * realTop}>
        <TouchableOpacity {...{onPress: openModal}}>
          <Icon name="icon-notification" size={32} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export const HeaderInfo = ({text, containerProps, textProps}) => {
  return (
    <Box
      padding="m"
      borderRadius={100}
      backgroundColor="mostBg"
      {...containerProps}>
      <Text
        color="primary"
        fontWeight="600"
        textAlign="center"
        fontSize={12}
        {...textProps}>
        {text}
      </Text>
    </Box>
  );
};

HeaderInfo.propTypes = {
  text: PropTypes.string,
  textProps: ViewPropTypes.style,
  containerProps: ViewPropTypes.style,
};
