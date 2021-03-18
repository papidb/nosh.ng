import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import {Box, Divider, HeaderInfo} from 'components';
import {SettingsTab} from 'components/Settings';
import {logout} from 'action';
import {uuid} from 'shared/utils';

export const Screen = ({logout}) => {
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
      onPress: () => logout(),
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

export const SettingsHome = connect(null, {logout})(Screen);
const styles = StyleSheet.create({
  scrollView: {flex: 1, paddingHorizontal: 20},
  header: {
    marginBottom: 15,
  },
  noMarginTop: {
    marginTop: 0,
  },
  bottomDivider: {
    marginVertical: 19,
    marginHorizontal: 35,
  },
});
