import React, {useState} from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import {launchImageLibrary} from 'react-native-image-picker';
import {useStore} from 'react-redux';

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
import {createFormData} from 'shared/utils';
import {
  showErrorSnackBar,
  showSuccessSnackBar,
  extractErrorMessage,
} from 'shared/utils';
import {ModalContainer} from './ModalContainer';

export const EditProfile = ({close, updateProfilePic, getUser}) => {
  const {user} = useStore().getState();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);
  console.log({avatar});

  const useImage = async (photo) => {
    if (photo.didCancel) return;
    setLoading(true);
    try {
      // console.log({photo});
      const res = await updateProfilePic(createFormData(photo));
      const text = res?.message ?? 'Successful';
      showSuccessSnackBar({text});
      let {avatar: newAvatar} = await getUser();
      setAvatar(newAvatar);
    } catch (error) {
      const text = extractErrorMessage(error);
      // console.log({text});
      showErrorSnackBar({text});
    } finally {
      setLoading(false);
    }
  };

  const pickImage = () => {
    if (loading) return;
    const options = {mediaType: 'photo'};
    launchImageLibrary(options, useImage);
  };

  return (
    <ModalContainer>
      <Box marginBottom="xs">
        <HeaderInfo text="EDIT PROFILE" />
      </Box>

      {/* Profile picture */}
      <Box flexDirection="row" alignItems="center" marginVertical="m">
        <TouchableOpacity onPress={pickImage} disabled={loading}>
          <Box marginRight="xxs">
            <AuthAvatar
              size={81}
              avatar={avatar}
              containerProps={{
                alignSelf: 'flex-start',
                marginTop: 'none',
                marginBottom: 'none',
                backgroundColor: 'success',
              }}
              imageProps={{style: {height: 60, width: 60, borderRadius: 60}}}
            />
            <Circle size={81} backgroundColor="overlayBg" position="absolute">
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Icon name="icon-edit2" size={30} />
              )}
            </Circle>
          </Box>
        </TouchableOpacity>

        <Box marginLeft="m">
          <Text fontSize={14} fontWeight="bold" color="text">
            Edit profile photo
          </Text>
        </Box>
      </Box>
      {/* Form */}
      <Box marginBottom="xs">
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
        <Button text="Save" onPress={close} />
      </Box>
    </ModalContainer>
  );
};

EditProfile.propTypes = {
  close: PropTypes.func,
};
