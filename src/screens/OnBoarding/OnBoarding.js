import React, {useState} from 'react';
import {
  Dimensions,
  Platform,
  Animated,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import ImageSequence from 'react-native-image-sequence';
import {useNavigation} from '@react-navigation/native';

import {
  Box,
  Button,
  Text,
  Circle,
  AuthContainer,
  AuthAvatar,
  RaiseAndroid,
} from 'components';
import {connect} from 'react-redux';
import {onBoardUser} from 'action';
import {showErrorSnackBar, extractErrorMessage} from 'shared/utils';
import {onboardingImages, splitToChunks} from './onboardingImages';
import {SafeAreaView} from 'react-native-safe-area-context';
import ExtraDimensions from 'react-native-extra-dimensions-android';

// const OTHER = Array.from(Array(249).keys()).map((imageNumber) => {
//   let fullImageName = `00${imageNumber}`;
//   let cutout = fullImageName.slice(0, -3);
//   if (cutout) fullImageName = fullImageName.replace(cutout, '');
//   const imagePath = `../../assets/onboarding/${fullImageName}.png`;
//   return imagePath;
//   // return require(imagePath);
// });
// console.log({OTHER});

const centerIndex = Math.round(onboardingImages.length / 2);
const phase = 3;
// const phaseAmount = onboardingImages.length / phase;
const splitedImages = splitToChunks([...onboardingImages], phase);

// const width = ExtraDimensions.getRealWindowWidth();
// console.log({width});

let {height, width} = Dimensions.get('window');
if (Platform.OS == 'android') width = ExtraDimensions.getRealWindowWidth();
const SIZE_WIDTH = width;
const SIZE_HEIGHT = height;

const data = [
  {
    heading: 'Comfort',
    description:
      'Trade in your Giftcards for instant cash without leaving your bed',
    key: 1,
  },
  {
    heading: 'Speed',
    description: 'Nothing, we repeat, Nothing is faster than Nosh transactions',
    key: 2,
  },
  {
    heading: 'Top Nosh',
    description: 'Our top notch services keep you satisfied All day, everyday',
    key: 3,
  },
];

const Item = ({heading, description, index, scrollX}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [
    (index - 0.3) * width,
    index * width,
    (index + 0.3) * width,
  ];

  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.1, 0, -width * 0.1],
  });
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.7, 0, -width * 0.7],
  });
  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0],
  });

  return (
    <Box flex={1} style={styles.itemStyle}>
      <Box flex={1} style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity,
              // transform: [{translateX: translateXHeading}],
            },
          ]}>
          {heading}
          <Animated.Text
            style={[
              styles.dot,
              {
                opacity,
                // transform: [{translateX: translateXHeading}],
              },
            ]}>
            .
          </Animated.Text>
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            {
              opacity,
              // transform: [
              //   {
              //     translateX: translateXDescription,
              //   },
              // ],
            },
          ]}>
          {description}
        </Animated.Text>
      </Box>
    </Box>
  );
};

const PAGINATION_INDICATOR = 8;
const Pagination = ({index, scrollX}) => {
  return (
    <Box flexDirection="row">
      {Array.from(Array(3).keys()).map((page) => {
        const inputRange = [
          (page - 1) * width,
          page * width,
          (page + 1) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.2, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.2],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={page}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              // backgroundColor:
              //   page === index ? 'white' : 'rgba(255,255,255,0.2)',
              marginRight: 10,
              width: PAGINATION_INDICATOR,
              height: PAGINATION_INDICATOR,
              borderRadius: PAGINATION_INDICATOR,
              backgroundColor: 'white',
              opacity,
              transform: [{scale}],
            }}
          />
        );
      })}
    </Box>
  );
};

const NextButton = ({index, scrollX, scrollTo}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const color = scrollX.interpolate({
    inputRange,
    outputRange: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)', 'red'],
    extrapolate: 'clamp',
  });

  const beforeLast = index < 2;

  return (
    <TouchableOpacity onPress={scrollTo}>
      <Box
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          padding: 10,
          paddingHorizontal: 32,
          alignSelf: 'center',
          backgroundColor: beforeLast
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(48,188,237,0.2)',
          // backgroundColor: color,
          borderRadius: 100,
        }}>
        <Text color={beforeLast ? 'white' : 'primary'} fontSize={16}>
          {beforeLast ? 'Next' : 'Get Started'}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

const OnBoardingScreen = ({onBoardUser}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const slidesRef = React.useRef(null);

  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const next = () => {
    setIndex((index + 1) % phase);
  };
  const scrollTo = React.useCallback(() => {
    if (index + 1 < phase) {
      slidesRef?.current?.scrollToIndex({index: index + 1});
    } else {
      onBoardUser();
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  }, [index, phase]);
  // const scrollTo = () => {
  //   console.log({index, nex: phase});
  //   if (index + 1 < phase) {
  //     slidesRef?.current?.scrollToIndex({index: index + 1});
  //   } else {
  //     console.log('Go away from onboarding screen');
  //   }
  // };
  const framesPerSecond = 24;
  const images = {
    0: onboardingImages.slice(49, 50),
    1: onboardingImages.slice(49, 100),
    2: onboardingImages.slice(155, 200),
    // 2: onboardingImages.slice(208, 209),
  };

  // slider props
  const viewabilityConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
    // waitForInteraction: true,
  }).current;
  const onViewableItemsChanged = React.useRef(({viewableItems}) => {
    const newIndex = viewableItems[0].index;
    console.log({newIndex});
    setIndex(newIndex);
  }).current;

  // return (
  //   <Box flex={1} backgroundColor="fadedDarkBlueButton">
  //  </Box>
  // );
  return (
    <Box
      flex={1}
      // style={{backgroundColor: '#411476'}}
    >
      <ImageBackground
        source={require('../../assets/onboarding/bg.png')}
        style={{width: '100%', height: '100%'}}>
        <Box width={SIZE_WIDTH - 12} position="absolute">
          <ImageSequence
            // images={splitedImages[index]}
            images={images[index]}
            startFrameIndex={centerIndex}
            framesPerSecond={framesPerSecond}
            style={{
              width: SIZE_WIDTH,
              height: SIZE_HEIGHT,
            }}
            loop={false}
          />
        </Box>

        <Box flex={1}>
          <SafeAreaView style={{flex: 1}}>
            <Animated.FlatList
              ref={slidesRef}
              // style={{flex: 1, height: 500}}
              keyExtractor={(item) => item.key + ''}
              data={data}
              renderItem={({item, index}) => (
                <Item {...item} index={index} scrollX={scrollX} />
              )}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              horizontal
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}
              scrollEventThrottle={16}
            />
          </SafeAreaView>
          <Box flex={1} justifyContent="flex-end">
            {/* {__DEV__ && <Text textAlign="center">{index}</Text>} */}
            <Box
              marginBottom="xl"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              paddingHorizontal="xl">
              <Pagination {...{index, scrollX}} />
              {/* button */}
              <NextButton {...{index, scrollX, scrollTo}} />
            </Box>
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
};

export const OnBoarding = connect(null, {onBoardUser})(OnBoardingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: 'contain',
    flex: 1,
  },
  textContainer: {
    // alignItems: 'flex-start',
    // alignSelf: 'flex-end',
    // flex: 0.8,
    flex: 0.8,
    marginHorizontal: 35,
  },
  dot: {
    fontSize: 30,
    color: '#30BCED',
  },
  heading: {
    color: '#FFF',
    // textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  description: {
    fontWeight: '600',
    textAlign: 'center',
    // width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    color: '#7F76D1',
  },
  logo: {
    opacity: 0.9,
    // height: LOGO_HEIGHT,
    // width: LOGO_WIDTH,
    resizeMode: 'contain',
    position: 'absolute',
    left: 10,
    bottom: 10,
    transform: [
      // {translateX: -LOGO_WIDTH / 2},
      // {translateY: -LOGO_HEIGHT / 2},
      {rotateZ: '-90deg'},
      // {translateX: LOGO_WIDTH / 2},
      // {translateY: LOGO_HEIGHT / 2},
    ],
  },
  pagination: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    flexDirection: 'row',
    // height: DOT_SIZE,
  },
  paginationDot: {
    // width: DOT_SIZE * 0.3,
    // height: DOT_SIZE * 0.3,
    // borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    // width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    // width: DOT_SIZE,
    // height: DOT_SIZE,
    // borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  tickerContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    overflow: 'hidden',
    // height: TICKER_HEIGHT,
  },
  tickerText: {
    // fontSize: TICKER_HEIGHT,
    // lineHeight: TICKER_HEIGHT,
    textTransform: 'uppercase',
    fontWeight: '800',
  },

  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    // width: CIRCLE_SIZE,
    // height: CIRCLE_SIZE,
    // borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    top: '15%',
  },
});
