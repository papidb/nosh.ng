import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {Portal} from 'react-native-portalize';
import {useModalize} from 'hooks';

import {Box, Text, Divider, Circle, Icon, RaiseAndroid} from 'components';
import {UserNameSetup} from 'components/Home';
import {palette} from 'constants/theme';
import images from 'constants/images';
import HomeHand from 'assets/icons/home_hand.svg';
import FastImage from 'react-native-fast-image';

import {useNavigation} from '@react-navigation/native';

const Balance = () => {
  // const amount = 267000;
  return (
    <Box
      marginHorizontal="s"
      backgroundColor="white"
      padding="l"
      borderRadius={155}
      justifyContent="center"
      alignItems="center">
      <Text fontSize={12} color="primary" textAlign="center" fontWeight="bold">
        Available Balance
      </Text>
      <Box flexDirection="row" alignItems="center">
        <Text
          color="buttonColor"
          fontSize={33}
          fontWeight="bold"
          lineHeight={42.37}>
          267,000
        </Text>
        <Text color="primary" fontSize={30}>
          .00
        </Text>
        <Text
          color="buttonColor"
          fontSize={15}
          fontWeight="bold"
          marginLeft="xxs">
          {'NGN'}
        </Text>
      </Box>
    </Box>
  );
};

export const Home = () => {
  const {
    openModal: openSetupUsername,
    closeModal: closeSetupUsername,
    Component: UserNameSetupModalize,
  } = useModalize();

  const toNoshWallet = () => {
    openSetupUsername();
  };
  const navigation = useNavigation();
  const toHottestCards = () => {
    navigation.navigate('HottestCards');
  };
  const toGiftCards = () => {
    navigation.navigate('GiftCard');
  };

  useEffect(() => openSetupUsername(), [openSetupUsername]);
  return (
    <Box flex={1}>
      <Portal>
        <UserNameSetupModalize childrenStyle={styles.childrenStyle}>
          <UserNameSetup close={closeSetupUsername} />
        </UserNameSetupModalize>
      </Portal>
      <Divider marginBottom="m" />
      {/* <Header /> */}
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <Balance />
        {/* Image */}
        <Box
          // alignItems="center"
          marginHorizontal="-l"
          marginVertical={{bigScreen: 'xxl', phone: 'xl'}}
          //
        >
          <Image source={images.FFHome} />
        </Box>
        {/* Rest */}
        <Box flex={1} flexDirection="row" marginBottom="s">
          <TouchableOpacity onPress={toHottestCards}>
            <Box
              flex={1}
              backgroundColor="mostBg"
              borderRadius={100}
              padding="l"
              justifyContent="center"
              flexDirection="row"
              alignItems="center">
              <Text fontSize={14} color="buttonColor" fontWeight="700">
                Hottest{' '}
              </Text>
              <Text fontSize={14} color="buttonColor">
                Cards
              </Text>
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={toGiftCards} style={{flex: 1}}>
            <Box
              flex={2}
              backgroundColor="mostBg"
              borderRadius={100}
              padding="xs"
              flexDirection="row"
              marginLeft="xxs"
              alignItems="center">
              <Box flex={1} justifyContent="center" flexDirection="row">
                <Text fontSize={14} color="buttonColor">
                  Sell{' '}
                </Text>
                <Text fontSize={14} color="buttonColor" fontWeight="700">
                  GiftCards
                </Text>
              </Box>
              <Box position="absolute" right={4}>
                <Circle size={42} backgroundColor="white">
                  <Icon name="icon-forward" size={14} />
                </Circle>
              </Box>
            </Box>
          </TouchableOpacity>
        </Box>
        <Divider />
        {/* Nosh Wallet */}
        <TouchableOpacity onPress={toNoshWallet}>
          <Box
            marginTop="s"
            flex={1}
            backgroundColor="mostBg"
            borderRadius={100}
            height={38}
            padding="m"
            paddingLeft="xl"
            paddingRight="l"
            justifyContent="space-between"
            flexDirection="row"
            alignItems="center">
            <Text color="primary" fontWeight="500" fontSize={14}>
              NOSH WALLET
            </Text>
            <Icon name="icon-forwardgreen" size={14} />
          </Box>
        </TouchableOpacity>
        <RaiseAndroid />
      </ScrollView>
    </Box>
  );
};
const styles = StyleSheet.create({
  scrollView: {flex: 1, paddingHorizontal: 20},
  childrenStyle: {
    backgroundColor: palette.darkBlueButton,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
  },
});
