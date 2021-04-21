import React, {useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSelector, useStore} from 'react-redux';

import {connect} from 'react-redux';
import {Portal} from 'react-native-portalize';
import {useModalize} from 'hooks';
import FastImage from 'react-native-fast-image';

import {Withdraw, AddBank} from 'components/Settings';
import {uuid} from 'shared/utils';
import {Box, Text, Divider, HeaderInfo, Circle, Icon, Header} from 'components';
import {UserNameSetup, Balance} from 'components/Home';
import {palette} from 'constants/theme';
import images from 'constants/images';
import {addBank, getBanks, getUser, verifyAccount, withdraw} from 'action';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Itunes',
    amount: 353,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Google Pay',
    amount: 353,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Nordstrom',
    amount: 353,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Nordstrom',
    amount: 353,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Nordstrom',
    amount: 353,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Nordstrom',
    amount: 353,
  },
];
const Item = ({title, index, amount}) => {
  const first = index === 0;
  const textColor = first ? 'primary' : 'white';
  const firstColor = !first ? 'primary' : 'white';
  return (
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
        <Image source={images.kuda} width={27} style={styles.iamge} />
      </Box>
      {/* Text */}
      <Box flex={1}>
        <Text fontSize={16} fontWeight="600" color="white" lineHeight={20.35}>
          Bank withdrawal
        </Text>
        <Text fontSize={12} fontWeight="600" color="success" lineHeight={15.26}>
          April 5 - 2021
        </Text>
      </Box>
      {/* Amount */}
      <Text
        fontWeight="600"
        fontSize={18}
        color="success"
        lineHeight={22.9}
        marginRight="l">
        60,000
      </Text>
    </Box>
  );
};

export const WalletScreen = ({
  addBank,
  getBanks,
  verifyAccount,
  getUser,
  withdraw,
}) => {
  const user = useSelector((state) => state.user);
  const banks = user?.wallet?.banks ?? [];
  console.log({banks});
  const thereIsBank = banks.length > 0;
  const {
    openModal: openAddBank,
    closeModal: closeAddBankModal,
    Component: AddBankModalize,
  } = useModalize();
  const {
    openModal: openWithdraw,
    closeModal: closeWithdrawModal,
    Component: WithdrawModalize,
  } = useModalize();
  const AddBankC = useCallback(
    () => (
      <AddBank
        close={closeAddBankModal}
        {...{user, addBank, getUser, getBanks, verifyAccount}}
      />
    ),
    [addBank, closeAddBankModal, getBanks, getUser, user, verifyAccount],
  );

  const renderItem = ({item, index}) => (
    <Item
      {...item}
      {...{index}}
      // {...props}
    />
  );

  const ScreenHeader = () => {
    return (
      <Box>
        <Divider />
        <Box position="relative">
          <Balance
            {...{
              user,
              containerProps: {style: {marginTop: 16, marginBottom: 8}},
            }}
          />
        </Box>

        <Box marginBottom="m">
          <HeaderInfo text="NOSH WALLET" />
        </Box>
        <Box marginBottom="xs">
          <Text
            color="success"
            textAlign="right"
            fontWeight="600"
            fontSize={12}
            lineHeight={15.26}
            style={styles.ngn}>
            NGN
          </Text>
          <Divider />
        </Box>
      </Box>
    );
  };
  return (
    <Box flex={1} paddingHorizontal="l">
      <Portal>
        <AddBankModalize>
          {/* <AddBankC /> */}
          <AddBankC />
        </AddBankModalize>
        <WithdrawModalize>
          <Withdraw
            close={closeWithdrawModal}
            {...{withdraw, banks, thereIsBank}}
          />
        </WithdrawModalize>
      </Portal>
      <FlatList
        data={DATA}
        ListHeaderComponent={ScreenHeader}
        renderItem={renderItem}
        keyExtractor={() => uuid()}
        ItemSeparatorComponent={() => (
          <Divider style={{marginHorizontal: 18, marginBottom: 8}} />
        )}
      />
      <Box flexDirection="row">
        <TouchableOpacity
          onPress={openWithdraw}
          style={{
            flex: 3,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(48,188,237,0.1)',
            borderRadius: 100,
            flexDirection: 'row',
            marginRight: 10,
          }}>
          <Icon name="icon-send" style={{position: 'absolute', left: 19}} />
          <Text
            color="primary"
            fontWeight="600"
            fontSize={12}
            style={{marginLeft: 19}}>
            WITHDRAW FUNDS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openAddBank}
          style={{
            flex: 2,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(48,188,237,0.1)',
            borderRadius: 100,
            flexDirection: 'row',
            marginRight: 10,
          }}>
          <Text color="white" fontWeight="600" fontSize={12}>
            + ADD BANK
          </Text>
        </TouchableOpacity>
      </Box>
      <Box height={100} />
    </Box>
  );
};
export const Wallet = connect(null, {
  addBank,
  getBanks,
  getUser,
  withdraw,
  verifyAccount,
})(WalletScreen);

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
