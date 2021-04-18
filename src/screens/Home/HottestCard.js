import React, {useEffect} from 'react';
import {
  FlatList,
  Dimension,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {Portal} from 'react-native-portalize';
import {useModalize} from 'hooks';
import FastImage from 'react-native-fast-image';

import {Box, Text, Divider, HeaderInfo, Circle, Icon, Header} from 'components';
import {UserNameSetup} from 'components/Home';
import {palette} from 'constants/theme';
import images from 'constants/images';

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
];
const Item = ({title, index, amount}) => {
  const first = index === 0;
  const textColor = first ? 'primary' : 'white';
  const firstColor = !first ? 'primary' : 'white';
  return (
    <TouchableOpacity>
      <Box
        flexDirection="row"
        // flex={1}
        alignItems="center"
        marginBottom="s"
        style={{marginBottom: 14, marginTop: 9}}
        // marginTop="xs"
      >
        <Circle
          size={34}
          backgroundColor={textColor}
          style={[
            {marginRight: 28},
            first
              ? {
                  borderWidth: 2,
                  borderColor: '#C7F0FF',
                  height: 38,
                  width: 38,
                  borderRadius: 38,
                }
              : {},
          ]}>
          <Text fontWeight="600" color={firstColor}>
            {index}
          </Text>
        </Circle>
        <Box flex={1} flexDirection="row" justifyContent="space-between">
          <Text fontSize={16} fontWeight="600" color={textColor}>
            {title}
          </Text>
          <Text fontSize={18} color={textColor}>
            {amount}/$
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export const HottestCard = () => {
  const imageUri = `https://api.nosh.ng/uploads/images/cards/Amazon.png`;
  const renderItem = ({item, index}) => (
    <Item
      {...item}
      {...{index}}
      // {...props}
    />
  );
  return (
    <Box flex={1} paddingHorizontal="l" paddingTop="l">
      <Divider />
      <Box position="relative">
        <FastImage
          source={{uri: imageUri, priority: FastImage.priority.high}}
          style={{width: 216, height: 123, alignSelf: 'center'}}
        />
        <Image
          source={images.fire}
          style={{
            width: 67,
            height: 67,
            top: -35,
            position: 'absolute',
            left: Dimensions.get('screen').width / 2 + 5,
          }}
        />
      </Box>

      <HeaderInfo text="HOTTEST CARDS" />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider style={null} />}
      />
    </Box>
  );
};
