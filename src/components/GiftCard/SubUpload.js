import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Box, Text, Circle, Button, HeaderInfo, Icon, Input} from 'components';
import {waait} from 'shared/utils';
import {GiftCardBox} from './GiftCardBox';

import images from 'constants/images';
import {capitalizeFirstLetter} from 'shared/utils';
import {palette} from 'constants/theme';
import FastImage from 'react-native-fast-image';
// import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

import {useFormik} from 'formik';
import {createFormArrayData, createFormData} from 'shared/utils';
import SwipeButton from 'rn-swipe-button';

import {
  showErrorSnackBar,
  showSuccessSnackBar,
  extractErrorMessage,
} from 'shared/utils';

export const SubUpload = ({
  next,
  prev,
  data: giftCard,
  setSwiperHeight,
  subCategory,
}) => {
  const [images, setImages] = useState([]);

  // const imageUri = `https://api.nosh.ng/uploads/images/cards/${giftCard.title}.png`;
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
        // const rawData = createFormArrayData(
        //   images.map(
        //     ({mime, path}) => console.log({path}) || {type: mime, uri: path},
        //   ),
        // );
        // console.log({rawData});
        // // const rawData = createFormData(images[0]);
        await waait(2000);
        showSuccessSnackBar({text: 'Trade Succeded, we will get back to you!'});
      } catch (error) {
        console.log({error});
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
  const thumbIcon = useCallback(() => {
    return (
      <Box backgroundColor="mostBg">
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Icon name="icon-forward" size={14} />
        )}
      </Box>
    );
  }, [isSubmitting]);
  // const thumbIcon = () => {

  // };
  const imagesSize = images.length;
  return (
    <Box
      onLayout={({
        nativeEvent: {
          layout: {height},
        },
      }) => {
        setSwiperHeight(height);
      }}>
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
          marginVertical="m">
          <TouchableOpacity
            onPress={() => {
              prev();
            }}>
            <Circle size={42} backgroundColor="white">
              <Icon name="icon-backward" size={14} />
            </Circle>
          </TouchableOpacity>

          <FastImage
            source={{uri: imageUri, priority: FastImage.priority.high}}
            style={styles.image}
          />
        </Box>
        <GiftCardBox marginVertical="m">
          <Text fontSize={16} fontWeight="600">
            {capitalizeFirstLetter(subCategory?.name)}
          </Text>
        </GiftCardBox>
        <TouchableOpacity onPress={openPicker}>
          <GiftCardBox marginVertical="m" padding="none">
            <Text fontSize={18} fontWeight="600">
              <Icon name="icon-cart" size={43.2} />
            </Text>
          </GiftCardBox>
          <Text
            color="primary"
            fontSize={12}
            fontWeight="600"
            textAlign="center"
            marginTop="xs">
            CLICK HERE TO UPLOAD CARD
          </Text>
          <Text
            color="primary"
            fontSize={12}
            fontWeight="600"
            textAlign="center"
            marginBottom="xs">
            {`${
              imagesSize != 0
                ? `${imagesSize} card${imagesSize > 1 ? 's' : ''}`
                : ''
            } selected`}
          </Text>
        </TouchableOpacity>

        {/* <Box>
          {images.map((item) => {
            console.log({item});
            return renderItem({item});
          })}
        </Box> */}

        {/* <FlatList
          style={[
            style.container,
            {
              paddingTop: 6,
            },
          ]}
          data={images}
          keyExtractor={(item, index) => (item?.filename ?? item?.path) + index}
          renderItem={renderItem}
          numColumns={3}
        /> */}
        <Box backgroundColor="transparent" marginVertical="m">
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
        {/* <Button
          variant="giftcard"
          text="SELL"
          disabled={isSubmitting}
          loading={isSubmitting}
          onPress={handleSubmit}
        /> */}
        <Box alignItems="center">
          <SwipeButton
            // disabled={isSubmitting}
            //disable the button by doing true (Optional)
            swipeSuccessThreshold={70}
            height={58}
            containerStyles={{borderWidth: 5}}
            //height of the button (Optional)
            width={'95%'}
            //width of the button (Optional)
            title="SWIPE T0 SELL"
            //Text inside the button (Optional)
            thumbIconComponent={thumbIcon}
            //You can also set your own icon for the button (Optional)
            onSwipeSuccess={handleSubmit}
            successTitle="loading"
            //After the completion of swipe (Optional)
            railFillBackgroundColor="#3DAA9D" //(Optional)
            railFillBorderColor="#3DAA9D" //(Optional)
            thumbIconBackgroundColor="rgba(61,170,157, 0.1)" //(Optional)
            shouldResetAfterSuccess
            // thumbIconBorderColor="#ed9aff" //(Optional)
            railBackgroundColor="#023248" //(Optional)
            railBorderColor="transparent" //(Optional)
            titleColor="#3DAA9D"
            titleStyles={{color: '#3DAA9D', textAlign: 'right', fontSize: 12}}
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
});
