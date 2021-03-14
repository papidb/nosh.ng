import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import Modal from 'react-native-modal';

import {Box, Text, Divider, HeaderInfo} from 'components';
import {TransactionTab, TransactionModal} from './components';
import {uuid} from 'shared/utils';

export const TransactionHome = () => {
  const [isModalVisible, setModalVisible] = useState(true);

  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

  return (
    <Box flex={1}>
      <Modal isVisible={isModalVisible} onBackdropPress={() => closeModal()}>
        <TransactionModal {...{closeModal}} />
      </Modal>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <Box marginBottom="m">
          <Divider />
          <Box marginTop="l" style={styles.header}>
            <HeaderInfo text="GIFTCARD TRANSACTION HISTORY" />
          </Box>
          <Text
            color="success"
            textAlign="right"
            fontWeight="bold"
            fontSize={12}
            lineHeight={15.26}
            style={styles.ngn}>
            NGN
          </Text>
          <Divider />
        </Box>
        {Array.from(Array(20)).map(() => {
          return <TransactionTab key={uuid()} onPress={() => openModal()} />;
        })}
      </ScrollView>
      <Divider style={[styles.bottomDivider, styles.noMarginTop]} />
      <Text textAlign="center" color="primary" fontSize={12} fontWeight="bold">
        CLICK ON TRANSACTION FOR DETAILS
      </Text>
      <Divider style={styles.bottomDivider} />
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
