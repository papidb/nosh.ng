import React, {useRef} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import {Box, Divider, HeaderInfo, NoshModalize} from 'components';
import {SettingsTab, EditProfile, AddBank} from 'components/Settings';
import {logout} from 'action';
import {uuid} from 'shared/utils';
import {Portal} from 'react-native-portalize';
import {useModalize} from 'hooks';

export const Screen = ({logout}) => {
  const {
    openModal: onOpenProfile,
    closeModal: closeProfileModal,
    Component: ProfileModalize,
  } = useModalize();
  const {
    openModal: openAddBank,
    closeModal: closeAddBankModal,
    Component: AddBankModalize,
  } = useModalize();

  const options = [
    {text: 'Edit Profile', icon: 'icon-expand', onPress: onOpenProfile},
    {text: 'Add Bank', icon: 'icon-add', onPress: openAddBank},
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
      {/* Modals */}
      <Portal>
        <ProfileModalize>
          <EditProfile close={closeProfileModal} />
        </ProfileModalize>
        <AddBankModalize>
          <AddBank close={closeAddBankModal} />
        </AddBankModalize>
      </Portal>
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
