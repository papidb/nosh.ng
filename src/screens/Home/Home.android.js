import React, {useCallback, useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import {Portal} from 'react-native-portalize';
import {useModalize} from 'hooks';

import {Box, Text, Divider, Circle, Icon, RaiseAndroid} from 'components';
import {UserNameSetup, Balance} from 'components/Home';
import {palette} from 'constants/theme';
import images from 'constants/images';
import HomeHand from 'assets/icons/home_hand.svg';
import FastImage from 'react-native-fast-image';
import {
  getBanks,
  getUser,
  logout,
  updatePushNotificationToken,
  getSettings,
} from 'action';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  showErrorSnackBar,
  extractErrorMessage,
  getRandomInt,
} from 'shared/utils';
import Layout from 'constants/Layout';
import Modal from 'react-native-modal';
import {createStructuredSelector} from 'reselect';
import {selectHasUsername} from 'selectors';
import {fcmService} from '../../../FCMService';
import {useQueries} from 'react-query';
import data from 'constants/data';
import Logger from 'shared/logger';
import messaging from '@react-native-firebase/messaging';

const HomeScreen = ({
  hasUsername,
  getBanks,
  getUser,
  logout,
  getSettings,
  updatePushNotificationToken,
}) => {
  const navigation = useNavigation();
  const [usernameVisible, setUsernameVisible] = useState(!hasUsername);

  const closeSetupUsername = () => setUsernameVisible(false);

  const toHottestCards = useCallback(
    () => navigation.navigate('HottestCards'),
    [navigation],
  );
  const toGiftCards = useCallback(() => navigation.navigate('Giftcard'), [
    navigation,
  ]);
  const toNoshWallet = useCallback(() => navigation.navigate('Wallet'), [
    navigation,
  ]);
  const toRatesCalculator = useCallback(
    () => navigation.navigate('RatesCalculator'),
    [navigation],
  );

  const coreImages = ['HomeCard', 'HomeCard2'];
  // const imageIndex = getRandomInt(0, coreImages.length - 1);

  // Many many
  const [refreshing, setRefreshing] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState(
    getRandomInt(0, coreImages.length - 1),
  );

  const qOptions = {
    staleTime: 5 * 60 * 60,
  };

  const [
    {refetch},
    {refetch: refetchBankData},
    {refetch: refetchAppSettings},
    {refetch: refetchBank},
  ] = useQueries([
    {
      queryKey: 'user',
      queryFn: getUser,
      initialData: data.userInitialState,
      ...qOptions,
    },
    {queryKey: 'bankData', queryFn: getBanks, ...qOptions},
    {queryKey: 'appSettings', queryFn: getSettings, ...qOptions},
    {queryKey: 'bankData', queryFn: getBanks, ...qOptions},
  ]);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      refetch(),
      refetchBankData(),
      refetchAppSettings(),
      refetchBank(),
    ]);
    setRefreshing(false);
  }, [refetch, refetchBankData, refetchAppSettings, refetchBank]);
  // console.log({usernameVisible});

  useEffect(() => {
    Logger.log('running init');
    fcmService
      .justGetToken()
      .then(updatePushNotificationToken)
      .catch((error) => {
        Logger.log(error);
      });
    (async () => {
      try {
        await messaging().subscribeToTopic('nosh_ng');
        await messaging().subscribeToTopic('ios.nosh_ng.ng');

        if (__DEV__) {
          await messaging().subscribeToTopic('test.ios.nosh_ng');
        }
      } catch (error) {
        Logger.log({error});
      }
    })();
    try {
      const unsubscribe = navigation.addListener('focus', async () => {
        try {
          console.log('running these cause this screen was focused on');
          await Promise.all([
            refetch(),
            refetchBankData(),
            refetchAppSettings(),
          ]);
        } catch (error) {}
      });
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    } catch (error) {}
  }, [
    getBanks,
    navigation,
    refetch,
    refetchAppSettings,
    refetchBankData,
    updatePushNotificationToken,
  ]);
  return (
    <Box flex={1}>
      <Modal isVisible={usernameVisible} style={styles.childrenStyle}>
        <UserNameSetup pureClose={closeSetupUsername} close={logout} />
      </Modal>
      <Divider />
      {/* <Header /> */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.scrollView}>
        {/* Header */}
        <Balance {...{containerProps: {style: {marginTop: 8}}}} />
        {/* Image */}
        <Box
          // alignItems="center"
          marginHorizontal="-l"
          style={styles.coreImage}>
          <Image
            source={images.Hands}
            style={
              {
                // height: 200,
                // width: Layout.window.width - 40,
                // resizeMode: 'contain',
              }
            }
          />
          <Image
            source={images[coreImages[imageIndex]]}
            style={{position: 'absolute', top: 46, left: 50}}
          />
        </Box>
        {/* Rest */}
        <Box flex={1} flexDirection="row" marginBottom="s">
          <TouchableOpacity onPress={toRatesCalculator} style={{flex: 1}}>
            <Box
              flex={1}
              backgroundColor="mostBg"
              height={52}
              borderRadius={100}
              justifyContent="center"
              flexDirection="row"
              alignItems="center">
              <Text fontSize={14} color="green" fontWeight="600">
                Check{' '}
              </Text>
              <Text fontSize={14} color="green">
                Rates
              </Text>
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={toGiftCards} style={{flex: 1.4}}>
            <Box
              flex={1}
              backgroundColor="mostBg"
              borderRadius={100}
              style={{padding: 5}}
              height={52}
              flexDirection="row"
              marginLeft="xxs"
              alignItems="center">
              <Box flex={1} justifyContent="center" flexDirection="row">
                <Text fontSize={14} color="buttonColor">
                  Sell{' '}
                </Text>
                <Text fontSize={14} color="buttonColor" fontWeight="600">
                  GiftCards
                </Text>
              </Box>
              <Box right={0}>
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
            <Text color="primary" fontWeight="600" fontSize={12}>
              NOSH WALLET
            </Text>
            <Icon name="icon-forwardgreen" size={14} />
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={toHottestCards}>
          <Box
            marginTop="s"
            flex={1}
            backgroundColor="warning"
            borderRadius={100}
            height={38}
            padding="m"
            paddingLeft="xl"
            paddingRight="l"
            justifyContent="space-between"
            flexDirection="row"
            alignItems="center">
            <Text color="accent" fontWeight="600" fontSize={12}>
              HOTTEST CARDS
            </Text>
            <Icon name="icon-forwardwarning" size={14} />
          </Box>
        </TouchableOpacity>
        <RaiseAndroid />
      </ScrollView>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  hasUsername: selectHasUsername,
});
export const Home = connect(mapStateToProps, {
  getBanks,
  getUser,
  logout,
  getSettings,
  updatePushNotificationToken,
})(HomeScreen);
const styles = StyleSheet.create({
  scrollView: {flex: 1, paddingHorizontal: 20},
  childrenStyle: {
    // backgroundColor: palette.darkBlueButton,
    justifyContent: 'flex-end',
    margin: 0,
    // flexGrow: 0,
  },
  coreImage: {
    marginTop: 8,
    marginBottom: 8,
  },
});
