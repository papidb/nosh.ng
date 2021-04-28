import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import FormData from 'form-data';

import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Box,
  Text,
  Circle,
  SwipeButton,
  Okay,
  HeaderInfo,
  Icon,
  Input,
  Divider,
} from 'components';
import {waait, uuid} from 'shared/utils';
import {GiftCardBox} from './GiftCardBox';
import Modal from 'react-native-modal';

// import images from 'constants/images';
import {capitalizeFirstLetter} from 'shared/utils';
import {palette} from 'constants/theme';
import FastImage from 'react-native-fast-image';
// import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

import {useFormik} from 'formik';
import {createFormArrayData, createFormData} from 'shared/utils';

import {
  showErrorSnackBar,
  showSuccessSnackBar,
  extractErrorMessage,
} from 'shared/utils';
import {useNavigation} from '@react-navigation/core';

const IS_ANDROID = Platform.OS === 'android';

export const SubUpload = ({
  next,
  prev,
  data: giftCard,
  setSwiperHeight,
  subCategory,
  images,
  setImages,
  amount,
  setAmount,
  tradeCard,
  reset,
  toWallet,
  text,
  setText,
  CommentInput,
}) => {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const handleChange = (e) => {
    setComment(e);
  };

  const navigation = useNavigation();

  const onModal = () => {
    setDone(true);
  };
  const offModal = () => {
    reset();
    navigation.navigate('Home');
    setDone(false);
  };

  console.log('omo');

  // const imageUri = `https://api.nosh.ng/uploads/images/cards/${giftCard.title}.png`;
  // console.log({subCategory});
  const imageUri = giftCard.avatar;
  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const rawData = createFormArrayData(images);
      // const rawData = new FormData();
      // const rawData = {};

      rawData.append('comment', text);
      rawData.append('cardTotalAmount', Number(amount));
      rawData.append('cardSubCategory', subCategory._id);
      rawData.append('cardCategory', giftCard._id);

      await tradeCard(rawData);
      setDone(true);
      // showSuccessSnackBar({text: 'Trade Succeded, we will get back to you!'});
    } catch (error) {
      console.log(error);
      console.log(extractErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [amount, giftCard._id, images, subCategory._id, text, tradeCard]);

  const openPicker = useCallback(async () => {
    try {
      // comment;
      // setComment;
      const maxFiles = 30;
      const options = {
        multiple: true,
        mediaType: 'photo',
        cropping: false,
        maxFiles,
      };
      const response = await ImagePicker.openPicker(options);
      setImages(response);
      // console.log({response});
    } catch (error) {
      console.log(error);
    }
  }, [setImages]);

  const renderItem = useCallback(({path}) => {
    return (
      <Circle size={75} key={uuid()} marginRight="xs">
        <Image
          style={{
            width: 75,
            height: 75,
            borderRadius: 75,
            // resizeMode: 'contain',
          }}
          source={{uri: path}}
        />
      </Circle>
    );
  }, []);
  const imagesSize = images.length;
  return (
    <>
      <Modal isVisible={done} backdropColor="#EAF8FD" backdropOpacity={1}>
        <Box flex={1} justifyContent="flex-start" alignItems="center">
          <Okay {...{offModal}} />
        </Box>
      </Modal>
      <Box>
        <KeyboardAwareScrollView>
          <HeaderInfo
            text={`UPLOAD GIFTCARD ${
              imagesSize != 0
                ? `(${imagesSize}) image${imagesSize > 1 ? 's' : ''}`
                : ''
            }`}
          />
          <Box
            justifyContent="space-between"
            flexDirection="row"
            marginVertical="xs">
            <TouchableOpacity onPress={prev}>
              <Circle size={42} backgroundColor="white">
                <Icon name="icon-backward" size={14} />
              </Circle>
            </TouchableOpacity>

            <FastImage
              source={{uri: imageUri, priority: FastImage.priority.high}}
              style={styles.image}
            />
          </Box>
          <GiftCardBox marginBottom="xs">
            <Text fontSize={16} fontWeight="600">
              {capitalizeFirstLetter(subCategory?.name)}
            </Text>
          </GiftCardBox>
          <TouchableOpacity onPress={openPicker}>
            {imagesSize ? (
              <Box
                paddingHorizontal="m"
                paddingVertical="xs"
                backgroundColor="white"
                borderRadius={155}
                justifyContent="center"
                overflow="hidden"
                style={{marginBottom: 14}}>
                <ScrollView
                  horizontal
                  contentContainerStyle={{overflow: 'hidden'}}
                  //
                >
                  {images.map((item) => {
                    return renderItem(item);
                  })}
                </ScrollView>
              </Box>
            ) : (
              <GiftCardBox padding="none" style={{marginBottom: 14}}>
                <Text fontSize={18} fontWeight="600">
                  <Icon name="icon-cart" size={43.2} />
                </Text>
              </GiftCardBox>
            )}
            <Text
              color="primary"
              fontSize={12}
              fontWeight="600"
              textAlign="center"
              marginBottom="m">
              CLICK HERE TO UPLOAD CARD
            </Text>
          </TouchableOpacity>
          <Box marginTop={IS_ANDROID ? 'none' : {bigScreen: 'l', phone: 'l'}} />
          <Box backgroundColor="transparent" style={{marginBottom: 23}}>
            <CommentInput />
          </Box>
          <Box
            marginTop={IS_ANDROID ? 'none' : {bigScreen: 'xxl', phone: 'xxl'}}
          />
          {/* Button */}
          <Box alignItems="center" marginBottom="s">
            <SwipeButton
              title="SWIPE TO SELL"
              // thumbIcon={thumbIcon}
              {...{loading}}
              onToggle={handleSubmit}
            />
          </Box>
          <Box>
            <Divider style={{marginBottom: 7, marginHorizontal: 31}} />
            {/* Nosh Wallet */}
            <TouchableOpacity onPress={toWallet}>
              <Box
                backgroundColor="mostBg"
                borderRadius={100}
                height={38}
                padding="m"
                paddingLeft="xl"
                paddingRight="l"
                justifyContent="space-between"
                flexDirection="row"
                alignItems="center"
                style={{marginHorizontal: 20}}>
                <Text color="primary" fontWeight="600" fontSize={12}>
                  NOSH WALLET
                </Text>
                <Icon name="icon-forwardgreen" size={14} />
              </Box>
            </TouchableOpacity>
          </Box>
        </KeyboardAwareScrollView>
      </Box>
    </>
  );
};
const styles = StyleSheet.create({
  image: {width: 120, height: 67.5},
});

SubUpload.propTypes = {
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

const {width} = Dimensions.get('window');

const IMAGE_WIDTH = (width - 24) / 3;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 24,
  },
  media: {
    marginLeft: 6,
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    marginBottom: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  openText: {
    fontWeight: '600',
    fontSize: 16,
  },
  openPicker: {
    flex: 1 / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDelete: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ffffff92',
    borderRadius: 4,
  },
  titleDelete: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 75,
    // resizeMode: 'contain',
  },
});
