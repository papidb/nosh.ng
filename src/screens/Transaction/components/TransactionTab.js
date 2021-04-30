/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef} from 'react';
import {TouchableOpacity, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';

import PropTypes from 'prop-types';
import {format} from 'date-fns';

import {Box, Text, Divider, Icon} from 'components';
import {purifyStatus, commaFormatter} from 'shared/utils';

import {useModalize} from 'hooks';
import {TransactionModal} from './TransactionModal';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

let {height, width} = Dimensions.get('window');

export const TransactionTab = ({onPress = () => {}, navigation, ...props}) => {
  const {
    cardTotalAmount,
    createdAt,
    tradeStatus,
    cardCategory,
    comment,
    tradeFiles,
  } = props;
  // console.log({tradeStatus});
  const modalizeRef = useRef(null);
  const toDetails = () => navigation.navigate('TransactionDetails', props);
  const openModal = () => {
    modalizeRef.current?.open();
  };
  const closeModal = () => {
    modalizeRef.current?.close();
  };
  // console.log({cardCategory});
  // const cardCategory = props?.cardCategory ?? {};
  const status = tradeStatus?.status ?? 'pending';
  const color = purifyStatus(status);
  // const {
  //   openModal: openTransaction,
  //   closeModal,
  //   Component: TransactionModalize,
  // } = useModalize();
  const TransactionModalC = useCallback(() => {
    return (
      <Modalize
        ref={modalizeRef}
        // modalHeight={height}
        disableScrollIfPossible={false}
        scrollViewProps={{
          showsVerticalScrollIndicator: true,
          // nestedScrollEnabled: true,
          stickyHeaderIndices: [0],

          // contentContainerStyle: {flex: 1},
        }}
        modalStyle={{
          zIndex: 5,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',

          backgroundColor: 'transparent',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,

          shadowColor: '#000',
          shadowOffset: {width: 0, height: 10},
          shadowOpacity: 0.1,
          shadowRadius: 12,

          elevation: 0,
        }}
        childrenStyle={{
          // flex: 1,
          borderRadius: 38,
          backgroundColor: 'white',
          minHeight: '60%',
          // height: '75%',
          // width: '80%',
          marginHorizontal: 20,
          flexDirection: 'row',
          alignSelf: 'center',
          // alignItems: 'center',
          // justifyContent: 'center',

          // alignItems: 'center',
          // marginBottom: 'auto',
          // flex: 1,
          // flexGrow: 1,
          // flexShrink: 1,
        }}
        withHandle={false}
        adjustToContentHeight
        //
      >
        <TransactionModal
          {...{
            closeModal,
            cardCategory,
            status,
            color,
            cardTotalAmount,
            createdAt,
            comment,
            tradeFiles,
            tradeStatus,
          }}
        />
      </Modalize>
    );
  }, [
    cardCategory,
    cardTotalAmount,
    color,
    comment,
    createdAt,
    status,
    tradeFiles,
    tradeStatus,
  ]);
  return (
    <>
      <Portal>
        <TransactionModalC />
      </Portal>

      <TouchableOpacity onPress={toDetails}>
        <Box
          flexDirection="row"
          alignItems="center"
          marginBottom="s"
          marginHorizontal="l">
          {/* Icon */}
          <Box
            backgroundColor="white"
            height={52}
            width={52}
            borderRadius={52}
            marginRight="m"
            justifyContent="center"
            alignItems="center">
            {/* <Icon name="icon-apple" /> */}
            <FastImage
              source={{
                uri: cardCategory.avatar,
                priority: FastImage.priority.high,
              }}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: 24,
                height: 24,
                marginLeft: 5,
              }}
            />
          </Box>
          {/* Text */}
          <Box flex={1}>
            <Text
              fontSize={14}
              fontWeight="600"
              color="text"
              lineHeight={20.35}>
              {cardCategory.name}
            </Text>
            <Text
              fontSize={11}
              fontWeight="600"
              color="success"
              lineHeight={15.26}>
              {format(new Date(createdAt), 'MMMM d - yyyy')}
            </Text>
          </Box>
          {/* Amount */}
          <Text
            fontWeight="600"
            fontSize={16}
            // color="success"
            color={color}
            lineHeight={22.9}
            marginRight="l">
            {commaFormatter(cardTotalAmount)}
          </Text>
        </Box>
        {/* <Divider marginBottom="s" /> */}
      </TouchableOpacity>
    </>
  );
};

TransactionTab.propTypes = {
  onPress: PropTypes.func,
};
