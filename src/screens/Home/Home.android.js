import React, {useEffect} from 'react';
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
import {getBanks, getUser, logout} from 'action';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  showErrorSnackBar,
  extractErrorMessage,
  getRandomInt,
} from 'shared/utils';
import Layout from 'constants/Layout';

import {createStructuredSelector} from 'reselect';
import {selectHasUsername} from 'selectors';

const HomeScreen = ({hasUsername, getBanks, getUser, logout}) => {
  const navigation = useNavigation();
  const {
    openModal: openSetupUsername,
    closeModal: closeSetupUsername,
    Component: UserNameSetupModalize,
    modalizeRef,
  } = useModalize();

  const toNoshWallet = () => {
    // openSetupUsername();
    navigation.navigate('Wallet');
    // openSetupUsername();
  };
  const toHottestCards = () => {
    navigation.navigate('HottestCards');
  };
  const toGiftCards = () => {
    navigation.navigate('Giftcard');
  };

  const coreImages = ['HomeCard', 'HomeCard2'];
  // const imageIndex = getRandomInt(0, coreImages.length - 1);

  // Many many
  const [refreshing, setRefreshing] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState(
    getRandomInt(0, coreImages.length - 1),
  );

  // get more data to use in app
  const getInfo = React.useCallback(async () => {
    return Promise.all([getBanks(), getUser()]);
  }, [getBanks, getUser]);

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await getInfo();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, [getInfo]);
  const init = React.useCallback(async () => {
    getBanks().catch((error) => {
      console.log(error);
    });
    (async () => {
      try {
        await getInfo();
      } catch (error) {
        console.log({error});
      }
      // try {
      //   await messaging().subscribeToTopic('nosh');
      //   if (__DEV__) {
      //     await messaging().subscribeToTopic('test');
      //   }
      // } catch (error) {
      //   console.log({error});
      // }
    })();
  }, [getBanks, getInfo]);
  useEffect(() => {
    console.log({hasUsername});
    if (hasUsername) return;
    setTimeout(() => {
      modalizeRef.current?.open();
    }, 2000);
    // console.log(modalizeRef.current?.open);
    // modalizeRef.current?.open?.();
  }, [hasUsername, modalizeRef]);
  useEffect(() => {
    console.log('running init');
    try {
      init();
      const unsubscribe = navigation.addListener('focus', async () => {
        try {
          console.log('running these cause this screen was focused on');
          await getInfo();
          await init();
        } catch (error) {}
      });
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    } catch (error) {
      const text = extractErrorMessage(error);
      showErrorSnackBar({text});
    }
  }, [getBanks, getInfo, init, navigation]);
  return (
    <Box flex={1}>
      <Portal>
        <UserNameSetupModalize
          childrenStyle={styles.childrenStyle}
          closeOnOverlayTap={false}
          panGestureEnabled={false}
          disableScrollIfPossible>
          <UserNameSetup pureClose={closeSetupUsername} close={logout} />
        </UserNameSetupModalize>
      </Portal>
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
          <TouchableOpacity onPress={toHottestCards} style={{flex: 1}}>
            <Box
              flex={1}
              backgroundColor="mostBg"
              height={52}
              borderRadius={100}
              justifyContent="center"
              flexDirection="row"
              alignItems="center">
              <Text fontSize={14} color="buttonColor" fontWeight="600">
                Hottest{' '}
              </Text>
              <Text fontSize={14} color="buttonColor">
                Cards
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
        <RaiseAndroid />
      </ScrollView>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  hasUsername: selectHasUsername,
});
export const Home = connect(mapStateToProps, {getBanks, getUser, logout})(
  HomeScreen,
);
const styles = StyleSheet.create({
  scrollView: {flex: 1, paddingHorizontal: 20},
  childrenStyle: {
    backgroundColor: palette.darkBlueButton,
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
  },
  coreImage: {
    marginTop: 8,
    marginBottom: 8,
  },
});
