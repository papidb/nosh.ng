import React from 'react';
import {SectionList} from 'react-native';

import {Box, Text, Close, Divider, HeaderInfo} from 'components';

import {commaFormatter} from 'shared/utils';

const DATA = [
  {
    title: 'april',
    data: [
      {title: 'Our rates are exploding right now!!!'},
      {amount: 30320, title: 'Withdrawal'},
    ],
  },
  {
    title: 'may',
    data: [
      {title: 'Our rates are exploding right now!!!'},
      {amount: 300, title: 'Withdrawal'},
    ],
  },
  {
    title: 'June',
    data: [
      {title: 'Our rates are exploding right now!!!'},
      {amount: 300, title: 'Withdrawal'},
    ],
  },
  {
    title: 'July',
    data: [
      {title: 'Our rates are exploding right now!!!'},
      {amount: 300, title: 'Withdrawal'},
    ],
  },
];

const Item = ({title, amount}) => (
  <Box
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    style={{paddingTop: 14, paddingBottom: 16, paddingHorizontal: 18}}>
    <Text
      fontFamily="Hurme Geometric Sans 2"
      fontSize={14}
      fontWeight="500"
      style={{color: '#525C6B'}}>
      {title}
    </Text>
    {amount && (
      <Text color="primary" fontSize={18}>
        {commaFormatter(amount)}
      </Text>
    )}
  </Box>
);

export const NotificationModal = ({closeModal}) => {
  return (
    <Box
      backgroundColor="white"
      borderRadius={38}
      padding="l"
      style={{paddingHorizontal: 15}}>
      <Close onPress={closeModal} />

      <Text
        fontWeight="bold"
        color="primary"
        textAlign="center"
        marginBottom="l">
        Notifications
      </Text>

      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item {...item} />}
        renderSectionHeader={({section: {title}}) => (
          <HeaderInfo
            text={String(title).toUpperCase()}
            containerProps={{backgroundColor: 'mostBgPure'}}
          />
        )}
        ItemSeparatorComponent={() => (
          <Divider style={{marginHorizontal: 18}} />
        )}
      />
    </Box>
  );
};
