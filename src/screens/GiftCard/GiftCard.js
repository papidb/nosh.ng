import React, {useMemo, useCallback, useRef, useState, useEffect} from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/core';
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
import {palette} from 'constants/theme';

import {Box, Text, Divider, Button, RaiseAndroid, Icon} from 'components';
import {
  SubGiftCard,
  SubCategory,
  SubUpload,
  SubAmount,
} from 'components/GiftCard';
import data from 'constants/data';
import {capitalizeFirstLetter} from 'shared/utils';

import {GiftCard as GiftCardImage} from '../../components/GiftCard/GiftCard';
import {getCards, tradeCard} from 'action';
import {connect} from 'react-redux';
import {
  showErrorSnackBar,
  showSuccessSnackBar,
  extractErrorMessage,
} from 'shared/utils';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const tabBarOptions = {
  renderIndicator: () => null,
  style: {
    backgroundColor: 'red',
  },
  sceneContainerStyle: {backgroundColor: 'red'},
};

const MyTabBar = () => {
  return null;
};

const GiftCardScreen = ({getCards, cardSubCategories, tradeCard}) => {
  const [index, setIndex] = useState(0);
  const [giftCard, setSelected] = useState(null);
  const [subCategory, setSubCategory] = useState({});
  const [height, setHeight] = useState(550);
  const [images, setImages] = useState([]);
  const [amount, setAmount] = useState(0);

  const navigation = useNavigation();
  const toSubGiftCard = useCallback(() => navigation.jumpTo('SubGiftCard'), [
    navigation,
  ]);
  const toSubCategory = useCallback(() => navigation.jumpTo('SubCategory'), [
    navigation,
  ]);
  const toSubAmount = useCallback(() => navigation.jumpTo('SubAmount'), [
    navigation,
  ]);
  const toSubUpload = useCallback(() => navigation.jumpTo('SubUpload'), [
    navigation,
  ]);

  const reset = useCallback(() => {
    setSubCategory({});
    setImages([]);
    setAmount(0);
    toSubGiftCard();
  }, [toSubGiftCard]);

  const toWallet = () => navigation.navigate('Wallet');
  // Many many
  // Many many
  const [refreshing, setRefreshing] = React.useState(false);

  // get more data to use in app
  const getInfo = React.useCallback(async () => {
    return Promise.all([getCards()]);
  }, []);

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
    (async () => {
      try {
        await getInfo();
      } catch (error) {
        console.log({error});
      }
    })();
  }, [getInfo]);
  useEffect(() => {
    console.log('running init');
    try {
      init();
      const unsubscribe = navigation.addListener('focus', async () => {
        try {
          console.log(
            'running these cause giftcard screen screen was focused on',
          );
          await getInfo();
          // await init();
        } catch (error) {}
      });
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    } catch (error) {
      const text = extractErrorMessage(error);
      showErrorSnackBar({text});
    }
  }, [getInfo, init, navigation]);
  const setSwiperHeight = React.useCallback(
    (newHeight) => {
      // console.log({newHeight, height});
      setHeight(Math.max(newHeight, height));
    },
    [setHeight, height],
  );
  const selectedGiftCard = useMemo(() => cardSubCategories[index] || {}, [
    cardSubCategories,
    index,
  ]);

  // console.log({selectedGiftCard});

  const TabScreen = useCallback(() => {
    return (
      <ScrollView style={giftcardStyles.scrollView}>
        <SubGiftCard
          onSnapToItem={(slideIndex) => {
            setIndex(slideIndex);
            // console.log(cardSubCategories[slideIndex]);
            setSelected(cardSubCategories[slideIndex]);
            // setSelected(data.giftCards[slideIndex]);
          }}
          {...{
            setSwiperHeight,
            // prev: goBack,
            next: toSubCategory,
            cardSubCategories,
            selectedGiftCard: selectedGiftCard,
          }}
        />
      </ScrollView>
    );
  }, [cardSubCategories, selectedGiftCard, setSwiperHeight, toSubCategory]);

  const SubCategoryCallBack = useCallback(
    () => (
      <ScrollView style={giftcardStyles.scrollView}>
        <SubCategory
          {...{
            setSwiperHeight,
            prev: toSubGiftCard,
            next: toSubAmount,
            data: selectedGiftCard,
            navigation,
            setSubCategory,
          }}
        />
      </ScrollView>
    ),
    [setSwiperHeight, toSubGiftCard, toSubAmount, selectedGiftCard, navigation],
  );
  const SubAmountCallBack = useCallback(
    () => (
      <ScrollView style={giftcardStyles.scrollView}>
        <SubAmount
          {...{
            setSwiperHeight,
            prev: toSubCategory,
            next: toSubUpload,
            data: selectedGiftCard,
            setSubCategory,
            subCategory,
            setAmount,
          }}
        />
      </ScrollView>
    ),
    [
      setSwiperHeight,
      toSubCategory,
      toSubUpload,
      selectedGiftCard,
      subCategory,
      setAmount,
    ],
  );
  const SubUploadCallback = useCallback(
    () => (
      <ScrollView style={giftcardStyles.scrollView}>
        <SubUpload
          {...{
            setSwiperHeight,
            prev: toSubAmount,
            // next: goToNextSlide,
            data: selectedGiftCard,
            setSubCategory,
            subCategory,
            images,
            setImages,
            amount,
            setAmount,
            tradeCard,
            reset,
          }}
        />
      </ScrollView>
    ),
    [
      setSwiperHeight,
      toSubAmount,
      selectedGiftCard,
      subCategory,
      images,
      amount,
      tradeCard,
      reset,
    ],
  );

  return (
    <Box flex={1}>
      <Tab.Navigator
        swipeEnabled={false}
        // swipeEnabled={__DEV__}
        sceneContainerStyle={{backgroundColor: '#EAF8FD'}}
        tabBarOptions={tabBarOptions}
        tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="SubGiftCard" component={TabScreen} />
        <Tab.Screen name="SubCategory" component={SubCategoryCallBack} />
        <Tab.Screen name="SubAmount" component={SubAmountCallBack} />
        <Tab.Screen name="SubUpload" component={SubUploadCallback} />
      </Tab.Navigator>
      <Divider marginTop="s" />
      {/* Nosh Wallet */}
      <TouchableOpacity onPress={toWallet}>
        <Box
          marginTop="s"
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
          <Text color="primary" fontWeight="600" fontSize={14}>
            NOSH WALLET
          </Text>
          <Icon name="icon-forwardgreen" size={14} />
        </Box>
      </TouchableOpacity>

      <RaiseAndroid height={90} />
    </Box>
  );
};
export const GiftCard = connect(
  ({misc: {cardSubCategories}}) => ({cardSubCategories}),
  {getCards, tradeCard},
)(GiftCardScreen);

const giftcardStyles = StyleSheet.create({
  scrollView: {paddingHorizontal: 20},
  wrapper: {
    // height: 300,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'red',
  },
  slide: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
  },
});

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD',
};
