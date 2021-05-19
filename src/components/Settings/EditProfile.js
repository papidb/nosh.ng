import React, {useState, useEffect} from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import {launchImageLibrary} from 'react-native-image-picker';
import {useStore} from 'react-redux';
import ImageColors from 'react-native-image-colors';

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
  const {user: rawUser} = useStore().getState();
  console.log({rawUser});
  const [user, setUser] = useState(rawUser);
  const [loading, setLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [avatar, setAvatar] = useState(user.avatar);
  console.log({avatar});

  const useImage = async (photo) => {
    if (photo.didCancel) return;
    setLoading(true);
    try {
      const res = await updateProfilePic(createFormData(photo));
      console.log({res});
      const text = res?.message ?? 'Successful';
      showSuccessSnackBar({text});
      let {avatar: newAvatar} = await getUser();
      setAvatar(newAvatar);
    } catch (error) {
      const text = extractErrorMessage(error);
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
  useEffect(() => {
    (async () => {
      // try {
      //   let newUser = await getUser();
      //   console.log({newUser});
      //   // setUser(newUser);
      // } catch (error) {
      //   console.log({error});
      // }
    })();
  }, [getUser, setUser]);
  // React.useEffect(() => {
  //   (async () => {
  //     const imageUri = `https://api.nosh.ng/${avatar}`;
  //     let bg = '';
  //     const colors = await ImageColors.getColors(imageUri, {
  //       fallback: '#30bced',
  //     });
  //     if (colors.platform === 'android') {
  //       bg = colors.average;
  //     } else {
  //       bg = colors.background;
  //       setBackgroundColor(bg);
  //     }
  //   })();
  // }, [avatar, setBackgroundColor]);

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
                style: {backgroundColor: backgroundColor},
              }}
              imageProps={{
                style: {
                  height: 70,
                  width: 70,
                  borderRadius: 70,
                },
                resizeMode: 'contain',
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
            <Circle size={81} backgroundColor="overlayBg" position="absolute">
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Icon name="icon-edit2" size={30} />
              )}
            </Circle>
          </Box>
        </TouchableOpacity>

        <Box marginLeft="m">
          <Text fontSize={14} fontWeight="600" color="text">
            Edit profile photo
          </Text>
        </Box>
      </Box>
      {/* Form */}
      <Box marginBottom="xs">
        <Input
          placeholder="Name"
          variant="profile"
          value={user.name}
          editable={false}
          nospace
        />
      </Box>
      <Box marginBottom="xs">
        <Input
          keyboardType="number-pad"
          placeholder="Number"
          variant="profile"
          value={user.phoneNumber}
          editable={false}
          nospace
        />
      </Box>
      <Box marginBottom="xs">
        <Input
          keyboardType="email-address"
          placeholder="Email"
          variant="profile"
          value={user.email}
          editable={false}
          nospace
        />
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
