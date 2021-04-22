import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
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
}) => {
  const [done, setDone] = useState(false);
  const navigation = useNavigation();

  const offModal = () => {
    navigation.navigate('Home');
    setDone(false);
  };

  // const imageUri = `https://api.nosh.ng/uploads/images/cards/${giftCard.title}.png`;
  // console.log({subCategory});
  const imageUri = giftCard.avatar;
  const {
    errors,
    values,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    isSubmitting,
    // validateForm,
    // resetForm,
    setFieldValue,
    // setValues,
    setFieldTouched,
    // isValid,
    // dirty,
  } = useFormik({
    initialValues: {comment: ''},
    onSubmit: async (values) => {
      try {
        const rawData = createFormArrayData(images);
        // const rawData = new FormData();
        // const rawData = {};

        rawData.append('comment', values.comment);
        rawData.append('cardTotalAmount', amount);
        rawData.append('cardSubCategory', subCategory.name);
        rawData.append('cardCategory', giftCard.name);
        await tradeCard(rawData);
        setDone(true);
        reset();
        showSuccessSnackBar({text: 'Trade Succeded, we will get back to you!'});
      } catch (error) {
        console.log(error);
        console.log(extractErrorMessage(error));
      }
    },
    // validationSchema: AmountSchema,
  });
  const openPicker = async () => {
    try {
      const maxImages = 30;
      const options = {
        multiple: true,
        mediaType: 'photo',
        cropping: false,
        maxFiles: 30,
      };
      const response = await ImagePicker.openPicker(options);
      setImages(response);
      console.log({response});
    } catch (error) {
      console.log(error);
    }
  };
  const renderItem = ({path}) => {
    return (
      <Circle size={75} key={uuid()}>
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
  };
  const imagesSize = images.length;
  return (
    <Box>
      <KeyboardAwareScrollView>
        <Modal isVisible={done} backdropColor="#EAF8FD" backdropOpacity={1}>
          <Box flex={1} justifyContent="flex-start" alignItems="center">
            <Okay {...{offModal}} />
          </Box>
        </Modal>
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
              style={{marginBottom: 14}}>
              <ScrollView horizontal>
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
        <Box backgroundColor="transparent" style={{marginBottom: 23}}>
          <Input
            onChangeText={handleChange('comment')}
            onBlur={handleBlur('comment')}
            error={errors.comment}
            touched={touched.comment}
            value={values.comment}
            placeholder="+ Add Optional comments"
            LeftIcon={<Icon name="icon-edit_colored" size={25} />}
            variant="profile"
            textAlign="right"
            placeholderTextColor={palette.green}
            inputStyle={{fontSize: 13, color: palette.green}}
            innerContainerProps={{height: 40, padding: 'm'}}
            nospace
          />
        </Box>
        {/* Button */}
        <Box alignItems="center" marginBottom="s">
          <SwipeButton
            title="SWIPE T0 SELL"
            // thumbIcon={thumbIcon}
            {...{loading: isSubmitting}}
            onToggle={handleSubmit}
          />
        </Box>
      </KeyboardAwareScrollView>
    </Box>
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
