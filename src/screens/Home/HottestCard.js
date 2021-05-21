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
  RaiseAndroid,
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
        style={{marginBottom: 14, marginTop: first ? 20 : 9}}
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
          <Box flex={1} paddingRight="m">
            <Text
              fontSize={16}
              fontWeight="600"
              color={textColor}
              numberOfLines={2}
              ellipsizeMode="tail"
              //
            >
              {cardCategory?.name}
            </Text>
            <Text
              fontSize={14}
              // fontWeight="600"
              color={textColor}
              numberOfLines={2}
              ellipsizeMode="tail"
              //
            >
              {name}
            </Text>
          </Box>

          <Text fontSize={16} fontWeight="600" color={textColor}>
            {rate}/$
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const HottestCardHeader = ({first = {}}) => {
  return (
    <Box paddingHorizontal="l" paddingTop="l" justifyContent="center">
      <FastImage
        source={{
          uri: first?.cardCategory?.avatar,
          priority: FastImage.priority.high,
        }}
        style={{width: 216, height: 123, alignSelf: 'center'}}
      />
      <HeaderInfo text="HOTTEST CARDS" />
    </Box>
  );
};

const HottestCardScreen = ({getAllSubCategories}) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getData = React.useCallback(async () => {
    try {
      const raw = await getAllSubCategories();
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
            <Divider style={{marginHorizontal: 45, marginBottom: 6}} />
          )}
          ListHeaderComponent={<HottestCardHeader first={data[0]} />}
          ListFooterComponent={() => <RaiseAndroid height={100} />}
        />
      )}
    </Box>
  );
};

export const HottestCard = connect(null, {getAllSubCategories})(
  HottestCardScreen,
);
