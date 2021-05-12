/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useStore} from 'react-redux';

import {connect} from 'react-redux';
import {useModalize} from 'hooks';
import FastImage from 'react-native-fast-image';
import {format} from 'date-fns';

import {Withdraw, AddBank} from 'components/Settings';
import {
  uuid,
  purifyStatus,
  commaFormatter,
  getDataFromPurePages,
} from 'shared/utils';
import {
  Box,
  Text,
  BankMapIcon,
  Divider,
  HeaderInfo,
  Loading,
  Icon,
  Header,
  Button,
} from 'components';
import {UserNameSetup, Balance} from 'components/Home';
import {palette} from 'constants/theme';
import images from 'constants/images';
import {
  addBank,
  getBanks,
  getUser,
  verifyAccount,
  getTransactions,
  withdraw,
  deleteBank,
} from 'action';
import {useNavigation} from '@react-navigation/core';
import {useInfiniteQuery} from 'react-query';
import {WithdrawalModal} from './WithdrawalModal';

import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

export const WithdrawalItem = (props = {}) => {
  const modalizeRef = useRef(null);
  const openModal = () => {
    modalizeRef.current?.open();
  };
  const closeModal = () => {
    modalizeRef.current?.close();
  };
  // console.log({props});
  const {
    title,
    bankCode,
    createdAt,
    status,
    amount,
    rejectionReason = '',
  } = props;
  //   console.log(props);
  const color = purifyStatus(status);
  let Img = BankMapIcon[bankCode]?.default ?? BankMapIcon['50746']?.default;
  const WithdrawalModalC = useCallback(() => {
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
        <WithdrawalModal {...props} {...{closeModal}} />
      </Modalize>
    );
  }, [props]);

  return (
    <Box>
      <Portal>
        <WithdrawalModalC />
      </Portal>
      <TouchableOpacity onPress={openModal}>
        <Box flexDirection="row" alignItems="center" marginBottom="s">
          {/* Icon */}

          <Box
            backgroundColor="white"
            height={52}
            width={52}
            borderRadius={52}
            marginRight="m"
            borderWidth={3}
            style={styles.circle}
            justifyContent="center"
            alignItems="center">
            <Img style={{width: 30, height: 30}} />
          </Box>
          {/* Text */}
          <Box flex={1}>
            <Text
              fontSize={14}
              fontWeight="600"
              color="white"
              lineHeight={20.35}>
              Bank withdrawal
            </Text>
            <Text
              fontSize={11}
              fontWeight="600"
              color="success"
              lineHeight={15.26}>
              {/* April 5 - 2021 */}
              {format(new Date(createdAt), 'MMMM d - yyyy')}
            </Text>
          </Box>
          {/* Amount */}
          <Text
            fontWeight="600"
            fontSize={16}
            lineHeight={22.9}
            marginRight="l"
            {...{color}}>
            {commaFormatter(amount)}
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};
const styles = StyleSheet.create({
  scrollView: {flex: 1, paddingHorizontal: 20},
  header: {
    marginBottom: 15,
  },
  ngn: {marginRight: 35, marginBottom: 9},
  noMarginTop: {
    marginTop: 0,
  },
  headerDivider: {
    marginHorizontal: 14,
  },
  bottomDivider: {
    marginVertical: 19,
    marginHorizontal: 35,
  },
  circle: {borderColor: 'rgba(48,188,237,0.15)'},
  image: {width: 27, height: 27},
});
