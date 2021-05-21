import React, {useState, useCallback, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Alert, Pressable, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import {
  Box,
  Text,
  SvgIcon,
  Close,
  Divider,
  RaiseAndroid,
  Circle,
} from 'components';
import {
  purifyStatus,
  showErrorSnackBar,
  showSuccessSnackBar,
} from 'shared/utils';
import {connect} from 'react-redux';
import {getTrades} from 'action';
import {palette} from 'constants/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/core';
import {capitalizeFirstLetter, uuid, commaFormatter} from 'shared/utils';
import FastImage from 'react-native-fast-image';
import Lightbox from 'react-native-lightbox-v2';

import {format} from 'date-fns';
import Snackbar from 'react-native-snackbar';

import ImageZoom from 'react-native-image-pan-zoom';
import Modal from 'react-native-modal';
import Layout from 'constants/Layout';

const renderLightBox = ({imageUrl, openModal}) => {
  return (
    <Circle size={75} key={uuid()} marginRight="xs">
      <TouchableOpacity onPress={() => openModal(imageUrl)}>
        <FastImage
          source={{
            uri: imageUrl,
            priority: FastImage.priority.high,
          }}
          style={{
            width: 75,
            height: 75,
            borderRadius: 75,
            // resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
    </Circle>
  );
};
const TransactionScreen = ({getTrades, route: {params}}) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const initialImage = 'https://www.nosh.ng/noshlogo.png';
  const [image, setImage] = useState(initialImage);
  const goBack = () => navigation?.goBack();
  const {
    amountPayable,
    cardTotalAmount,
    createdAt,
    tradeStatus,
    cardCategory,
    comment,
    tradeFiles = [],
    tradeRef,
    cardSubCategory,
    // ...props
  } = params;

  // console.log({props})
  const copyTransactionRef = useCallback(async () => {
    try {
      await Clipboard.setString(tradeRef);

      showSuccessSnackBar({
        text: `Copied transaction ref ${tradeRef}`,
        duration: Snackbar.LENGTH_SHORT,
      });
    } catch (error) {
      showErrorSnackBar({
        text: `Couldn't copy transaction ref ${tradeRef}`,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, [tradeRef]);

  // console.log({props});
  const status = tradeStatus?.status ?? 'pending';
  const avatar = tradeStatus?.avatar ?? null;
  const color = purifyStatus(status);
  console.log({tradeRef});
  const rejectionReason = tradeStatus?.rejectionReason;
  const openModal = (imageUrl) => {
    setImage(imageUrl);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(!modalVisible);
    // setImage(initialImage);
  };
  const marginTop = top;
  const IMAGE_PADDING = 20;
  const height = Layout.window.height;
  const width = Layout.window.width;
  const IMAGE_ZOOM_HEIGHT = height - marginTop - IMAGE_PADDING;
  const IMAGE_ZOOM_WIDTH = width;
  // return (
  //   <Box flex={1}>
  //     <Box marginTop="xxxl">
  //       <Pressable
  //         style={[styles.button, styles.buttonOpen]}
  //         onPress={() => setModalVisible(true)}>
  //         <Text style={styles.textStyle}>Show Modal</Text>
  //       </Pressable>
  //     </Box>

  //   </Box>
  // );
  return (
    <Box flex={1} style={{paddingTop: top}}>
      <Close
        onPress={goBack}
        circleProps={{style: {marginTop: 16, marginRight: 16}}}
        Icon={SvgIcon.CloseIconLight}
      />
      <Modal
        // animationType="slide"
        style={{margin: 0}}
        onModalHide={() => {
          setImage(initialImage);
        }}
        // transparent={false}
        isVisible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setModalVisible(!modalVisible);
        // }}
      >
        <Box
          flex={1}
          //  backgroundColor="success"
        >
          <Box
            zIndex={200000}
            position="absolute"
            right={0}
            style={{marginTop}}>
            <Close
              onPress={closeModal}
              circleProps={{style: {marginTop: 16, marginRight: 16}}}
              Icon={SvgIcon.CloseIconLight}
            />
          </Box>
          <ImageZoom
            cropWidth={IMAGE_ZOOM_WIDTH}
            cropHeight={height}
            imageWidth={IMAGE_ZOOM_WIDTH}
            imageHeight={IMAGE_ZOOM_HEIGHT - IMAGE_PADDING}
            enableSwipeDown={true}
            onSwipeDown={closeModal}>
            <Image
              enableHorizontalBounce={true}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: IMAGE_ZOOM_WIDTH - IMAGE_PADDING,
                height: IMAGE_ZOOM_HEIGHT,
                resizeMode: 'contain',
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              source={{
                uri: image,
                cache: 'force-cache',
              }}
              // resizeMode="cover"
              resizeMethod="resize" // <-------  this helped a lot as OP said
              progressiveRenderingEnabled={true} // <---- as well as this
            />
          </ImageZoom>
        </Box>
      </Modal>
      {/* Header */}
      <ScrollView style={styles.scrollView}>
        <Box
          flexDirection="row"
          alignItems="center"
          marginBottom="s"
          marginTop="l"
          justifyContent="space-between">
          <FastImage
            source={{
              uri: cardCategory.avatar,
              priority: FastImage.priority.high,
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: 97,
              height: 55,
            }}
          />
          <Box flexDirection="row">
            <Text color="primary" fontSize={13} fontWeight="600">
              Status:{' '}
            </Text>
            <Text color="primary" fontSize={13} fontWeight="600" {...{color}}>
              {capitalizeFirstLetter(status)}
            </Text>
          </Box>
        </Box>

        <Box>
          <Box marginTop="xl">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              marginBottom="xxs"
              marginHorizontal="l"
              alignItems="center">
              <Text fontSize={14} color="white" fontWeight="600">
                Transaction ID:
              </Text>
              <TouchableOpacity onPress={copyTransactionRef}>
                <Text color="success" fontWeight="600">
                  {tradeRef}
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
          {tradeFiles.length > 0 && (
            <>
              <Divider
                marginTop="m"
                marginBottom="m"
                style={styles.headerDivider}
              />
              <Box marginLeft="m">
                <ScrollView
                  nestedScrollEnabled
                  horizontal
                  // contentContainerStyle={{overflow: 'hidden'}}
                  //
                >
                  {tradeFiles.map((item) => {
                    return renderLightBox({imageUrl: item, openModal});
                  })}
                </ScrollView>
                <Text fontSize={13} color="success" marginTop="m">
                  Click image to expand
                </Text>
              </Box>
            </>
          )}

          <Box>
            <Divider
              marginBottom="l"
              marginTop="m"
              style={styles.headerDivider}
            />
            <Box
              // flexDirection="row"
              justifyContent="space-between"
              marginBottom="s"
              marginHorizontal="l"
              // alignItems="center"
            >
              <Text
                color="white"
                fontSize={13}
                fontWeight="600"
                marginBottom="xs">
                {cardCategory?.name}
              </Text>
              <Text color="primary" fontSize={14} fontWeight="600">
                {cardSubCategory?.name}
              </Text>
            </Box>

            <Divider marginTop="m" style={styles.headerDivider} />
          </Box>
          <Box>
            <Box
              marginTop="l"
              flexDirection="row"
              justifyContent="space-between"
              marginBottom="s"
              marginHorizontal="l"
              alignItems="center">
              <Text color="primary" fontSize={24}>
                {commaFormatter(cardTotalAmount)}
              </Text>
              <Text color="success" fontSize={24} textAlign="right">
                {commaFormatter(amountPayable)}
              </Text>
            </Box>
            <Box marginHorizontal="l">
              <Text
                color="success"
                fontSize={12}
                fontWeight="600"
                textAlign="right">
                NGN
              </Text>
            </Box>
            <Divider marginTop="m" style={styles.headerDivider} />
          </Box>
          {!!comment && (
            <Box>
              <Box
                marginTop="l"
                justifyContent="flex-end"
                marginBottom="s"
                marginHorizontal="l"
                //
              >
                <Text
                  fontSize={14}
                  textAlign="left"
                  marginBottom="m"
                  fontWeight="600"
                  style={{color: '#D3D3D3'}}>
                  Optional comments
                </Text>
                <Text fontSize={12} textAlign="left" style={{color: '#D3D3D3'}}>
                  {comment}
                </Text>
              </Box>
              <Divider style={styles.headerDivider} />
            </Box>
          )}
          {!!avatar && (
            <>
              <Box marginLeft="m">
                {renderLightBox({imageUrl: avatar, openModal})}
                <Text fontSize={13} color="success" marginTop="m">
                  Click rejection image to expand
                </Text>
              </Box>
              <Divider
                marginTop="m"
                marginBottom="m"
                style={styles.headerDivider}
              />
            </>
          )}
          <Box>
            {!!rejectionReason && (
              <Box
                marginTop="l"
                justifyContent="flex-end"
                marginBottom="s"
                marginHorizontal="l">
                <Text
                  fontSize={14}
                  textAlign="left"
                  marginBottom="m"
                  fontWeight="600"
                  style={{color: '#525C6B'}}>
                  Rejection Reason
                </Text>
                <Text fontSize={12} textAlign="left" style={{color: '#D3D3D3'}}>
                  {rejectionReason}
                </Text>
              </Box>
            )}
          </Box>
        </Box>
        <RaiseAndroid height={100} />
      </ScrollView>
    </Box>
  );
};

export const TransactionDetails = connect(null, {getTrades})(TransactionScreen);

const styles = StyleSheet.create({
  scrollView: {flex: 1, paddingHorizontal: 20},
  headerDivider: {
    marginHorizontal: 14,
  },
  bottomDivider: {
    marginVertical: 16,
    marginHorizontal: 35,
  },

  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
