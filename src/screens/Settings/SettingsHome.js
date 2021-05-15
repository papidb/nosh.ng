import React, {useCallback} from 'react';
import {ScrollView, Linking, StyleSheet} from 'react-native';

import PropTypes from 'prop-types';
import Share from 'react-native-share';
import {connect} from 'react-redux';
import Intercom from 'react-native-intercom';

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
  getSettings,
  addBank,
  getBanks,
  verifyAccount,
  deleteBank,
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
  getSettings,
  deleteBank,
  getBanks,
  verifyAccount,
  bankList,
  bankMap,
  addBank,
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

  const AddBankC = useCallback(
    () => (
      <AddBank
        close={closeAddBankModal}
        {...{addBank, getUser, deleteBank, getBanks, verifyAccount}}
      />
    ),
    [addBank, closeAddBankModal, deleteBank, getBanks, getUser, verifyAccount],
  );
  const SecurityC = useCallback(
    () => (
      <Security close={closeSecurityModal} {...{changePassword, toggleBio}} />
    ),
    [changePassword, closeSecurityModal, toggleBio],
  );
  const onShare = async () => {
    try {
      const result = await Share.open({
        title: 'Download Nosh',
        message: 'Please install this app and stay safe.',
        url: 'https://nosh.ng',
      });
      console.log({result});
    } catch (error) {
      // console.log(error.message);
    }
  };

  const options = [
    {text: 'Edit Profile', icon: 'icon-expand', onPress: onOpenProfile},
    {text: 'Add Bank', icon: 'icon-add', onPress: openAddBank},
    {
      text: 'Security settings',
      icon: 'icon-not_visible',
      onPress: openSecurity,
    },
    {
      text: 'Privacy policy',
      icon: 'icon-bookmark',
      onPress: () => {
        try {
          Linking.openURL('https://nosh.ng/privacy-policy');
        } catch (error) {
          console.log({error});
        }
      },
    },
    {
      text: 'Live chat',
      icon: 'icon-chat',
      onPress: () => {
        // Intercom.displayMessageComposerWithInitialMessage();
        // Intercom.displayHelpCenter();
        Intercom.displayConversationsList();
      },
    },
    {text: 'Share App', icon: 'icon-share', onPress: onShare},
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
      {/* <Divider style={[styles.bottomDivider, styles.noMarginTop]} /> */}
      <Box style={{paddingTop: 15}}>
        <Divider style={{marginHorizontal: 53}} />
      </Box>
      <ScrollView style={styles.scrollView}>
        <Box marginBottom="xl">
          <HeaderInfo text="NOSH SETTINGS" />
        </Box>
        <Divider style={[styles.bottomDivider, styles.noMarginTop]} />
        {options.map((data) => (
          <SettingsTab {...data} key={uuid()} />
        ))}
        <Divider style={styles.bottomDivider} />
        <RaiseAndroid height={80} />
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
          {/* <AddBankC /> */}
          <AddBankC />
        </AddBankModalize>
        <WithdrawModalize>
          <Withdraw close={closeWithdrawModal} {...{getSettings}} />
        </WithdrawModalize>
        <SecurityModalize>
          <SecurityC />
        </SecurityModalize>
      </Portal>
    </Box>
  );
};

Screen.propTypes = {
  logout: PropTypes.func,
};

const mapStateToProps = ({user}) => ({
  user,
  // bankList,
  // bankMap,
});
export const SettingsHome = connect(null, {
  logout,
  changePassword,
  toggleBio,
  updateProfilePic,
  getUser,
  addBank,
  getBanks,
  verifyAccount,
  deleteBank,
  getSettings,
})(Screen);
const styles = StyleSheet.create({
  scrollView: {flex: 1, paddingHorizontal: 20, paddingTop: 20},
  header: {
    marginBottom: 15,
  },
  noMarginTop: {
    marginTop: 0,
  },
  bottomDivider: {
    marginVertical: 19,
    // marginBottom: 10,
    marginHorizontal: 35,
  },
});
