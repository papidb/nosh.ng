import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Box, Divider, HeaderInfo, RaiseAndroid} from 'components';
import {
  SettingsTab,
  EditProfile,
  Withdraw,
  AddBank,
  Security,
} from 'components/Settings';
import {
  changePassword,
  toggleBio,
  logout,
  getUser,
  updateProfilePic,
} from 'action';
import {uuid} from 'shared/utils';
import {Portal} from 'react-native-portalize';
import {useModalize} from 'hooks';

export const Screen = ({
  logout,
  toggleBio,
  changePassword,
  updateProfilePic,
  getUser,
}) => {
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
  const {
    openModal: openWithdraw,
    closeModal: closeWithdrawModal,
    Component: WithdrawModalize,
  } = useModalize();
  const {
    openModal: openSecurity,
    closeModal: closeSecurityModal,
    Component: SecurityModalize,
  } = useModalize();

  const options = [
    {text: 'Edit Profile', icon: 'icon-expand', onPress: onOpenProfile},
    {text: 'Add Bank', icon: 'icon-add', onPress: openAddBank},
    {
      text: 'Security settings',
      icon: 'icon-not_visible',
      onPress: openSecurity,
    },
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
        <RaiseAndroid />
      </ScrollView>
      {/* Modals */}
      <Portal>
        <ProfileModalize>
          <EditProfile
            close={closeProfileModal}
            {...{updateProfilePic, getUser}}
          />
        </ProfileModalize>
        <AddBankModalize>
          <AddBank close={closeAddBankModal} />
        </AddBankModalize>
        <WithdrawModalize>
          <Withdraw close={closeWithdrawModal} />
        </WithdrawModalize>
        <SecurityModalize>
          <Security
            close={closeSecurityModal}
            {...{changePassword, toggleBio}}
          />
        </SecurityModalize>
      </Portal>
    </Box>
  );
};

Screen.propTypes = {
  logout: PropTypes.func,
};

// ({misc: {bio}}) => ({bio})
export const SettingsHome = connect(null, {
  logout,
  changePassword,
  toggleBio,
  updateProfilePic,
  getUser,
})(Screen);
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
