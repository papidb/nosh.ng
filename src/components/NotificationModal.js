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
    style={{paddingTop: 14, paddingBottom: 16}}>
    <Text fontWeight="600">{title}</Text>
    {amount && (
      <Text color="primary" fontSize={18}>
        {commaFormatter(amount)}
      </Text>
    )}
  </Box>
);

export const NotificationModal = ({closeModal}) => {
  return (
    <Box backgroundColor="white" borderRadius={38} padding="l">
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
          <HeaderInfo text={String(title).toUpperCase()} />
        )}
        ItemSeparatorComponent={() => <Divider style={null} />}
      />
    </Box>
  );
};
