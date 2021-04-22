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

import {
  Box,
  Text,
  Loading,
  Divider,
  HeaderInfo,
  Circle,
  Icon,
  Header,
} from 'components';
import {uuid} from 'shared/utils';
import {getAllSubCategories} from 'action';
import {UserNameSetup} from 'components/Home';
import {palette} from 'constants/theme';
import images from 'constants/images';
import {connect} from 'react-redux';

const Item = (props) => {
  const {name, index, cardCategory, rate} = props;
  // console.log({props});
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
        marginHorizontal="l"
        style={{marginBottom: 14, marginTop: 9}}
        // marginTop="xs"
      >
        <Circle
          size={34}
          backgroundColor={textColor}
          style={[
            {marginRight: 28},
            first
              ? // eslint-disable-next-line react-native/no-inline-styles
                {
                  borderWidth: 2,
                  borderColor: '#C7F0FF',
                  height: 38,
                  width: 38,
                  borderRadius: 38,
                }
              : {},
          ]}>
          <Text fontWeight="600" color={firstColor}>
            {index + 1}
          </Text>
        </Circle>
        <Box flex={1} flexDirection="row" alignItems="center">
          <Box flex={1}>
            <Text
              fontSize={16}
              fontWeight="600"
              color={textColor}
              numberOfLines={2}
              ellipsizeMode="tail"
              //
            >
              {name}
            </Text>
            <Text
              fontSize={14}
              fontWeight="600"
              color={textColor}
              numberOfLines={2}
              ellipsizeMode="tail"
              //
            >
              {cardCategory?.name}
            </Text>
          </Box>

          <Text fontSize={18} color={textColor}>
            {rate}/$
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const HottestCardScreen = ({getAllSubCategories}) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getData = React.useCallback(async () => {
    try {
      const raw = await getAllSubCategories();
      // console.log(setData);
      // setData([...raw, ...raw, ...raw]);
      setData(raw);
    } catch (error) {
      console.log({error});
    } finally {
      setLoading(false);
    }
  }, [getAllSubCategories, setData]);
  React.useEffect(() => {
    getData();
  }, [getData]);

  const renderItem = ({item, index}) => (
    <Item
      {...item}
      {...{index}}
      // {...props}
    />
  );

  return (
    <Box flex={1}>
      <Divider />
      {loading ? (
        <Loading />
      ) : data.length == 0 ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text
            textAlign="center"
            color="primary"
            fontSize={14}
            fontWeight="600">
            {'Something went wrong!!!'}
          </Text>
        </Box>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={() => uuid()}
          ItemSeparatorComponent={() => (
            <Divider style={{marginHorizontal: 45}} />
          )}
          ListHeaderComponent={() => {
            return (
              <Box paddingHorizontal="l" paddingTop="l">
                <Box position="relative">
                  <FastImage
                    source={{
                      uri: data[0]?.cardCategory?.avatar,
                      priority: FastImage.priority.high,
                    }}
                    style={{width: 216, height: 123, alignSelf: 'center'}}
                  />
                  <Image
                    source={images.fire}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      width: 67,
                      height: 67,
                      top: -35,
                      position: 'absolute',
                      right: Dimensions.get('screen').width / 2 + 13,
                    }}
                  />
                </Box>

                <HeaderInfo text="HOTTEST CARDS" />
              </Box>
            );
          }}
        />
      )}
    </Box>
  );
};

export const HottestCard = connect(null, {getAllSubCategories})(
  HottestCardScreen,
);
