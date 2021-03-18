import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import Modal from 'react-native-modal';

import {Box, Text, Divider, Icon, HeaderInfo, Circle} from 'components';
import {uuid} from 'shared/utils';

const SettingsTab = ({
  text,
  icon,
  iconProps,
  onPress,
  containerProps,
  circleProps,
  textProps,
}) => {
  return (
    <TouchableOpacity {...{onPress}}>
      <Box
        backgroundColor="whiteFaded"
        flexDirection="row"
        borderRadius={100}
        alignItems="center"
        paddingRight="l"
        marginBottom="xs"
        height={57}
        {...containerProps}>
        <Circle
          size={57}
          backgroundColor="whiteFaded"
          marginRight="xs"
          {...circleProps}>
          <Icon name={icon} size={30} {...iconProps} />
        </Circle>
        <Box
          flex={1}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          marginLeft="l">
          <Text fontSize={15} fontWeight="600" {...textProps}>
            {text}
          </Text>
          <Icon size={14} name="icon-forward" />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export const SettingsHome = () => {
  const options = [
    {text: 'Edit Profile', icon: 'icon-expand'},
    {text: 'Add Bank', icon: 'icon-add'},
    {text: 'Security settings', icon: 'icon-not_visible'},
    {text: 'Privacy policy', icon: 'icon-bookmark'},
    {text: 'Live chat', icon: 'icon-chat'},
    {text: 'Share App', icon: 'icon-share'},
    {
      text: 'LogOut',
      icon: 'icon-power',
      containerProps: {
        backgroundColor: 'mostBg',
      },
      circleProps: {
        backgroundColor: 'mostBg',
      },
      textProps: {color: 'primary'},
    },
  ];
  return (
    <Box flex={1}>
      <Divider style={[styles.bottomDivider, styles.noMarginTop]} />
      <ScrollView style={styles.scrollView}>
        <Box marginBottom="xl">
          <HeaderInfo text="NOSH SETTINGS" />
        </Box>
        <Divider style={[styles.bottomDivider, styles.noMarginTop]} />
        {options.map((data) => (
          <SettingsTab {...data} key={uuid()} />
        ))}
        <Divider style={styles.bottomDivider} />
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  scrollView: {flex: 1, paddingHorizontal: 20},
  header: {
    marginBottom: 15,
  },
  ngn: {marginRight: 35, marginBottom: 9},
  noMarginTop: {
    marginTop: 0,
  },
  headerDivider: {
    marginHorizontal: 14,
  },
  bottomDivider: {
    marginVertical: 19,
    marginHorizontal: 35,
  },
});
