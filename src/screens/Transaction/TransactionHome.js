import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Modal from 'react-native-modal';

import {Box, Text, Divider, SvgIcon, Circle, HeaderInfo} from 'components';
import {TransactionTab} from './components';
import {uuid} from 'shared/utils';
import images from 'constants/images';

export const TransactionHome = () => {
  const [isModalVisible, setModalVisible] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

  return (
    <Box flex={1}>
      <Modal isVisible={isModalVisible} onBackdropPress={() => closeModal()}>
        <Box backgroundColor="white" borderRadius={38} padding="l">
          <TouchableOpacity onPress={() => closeModal()}>
            <Circle
              size={41}
              borderWidth={4}
              borderColor="primary"
              alignSelf="flex-end">
              <SvgIcon.CloseIcon />
            </Circle>
          </TouchableOpacity>

          {/* Content */}
          <Box alignItems="center" marginBottom="s" marginTop="l">
            <Image source={images.itunes_2} />
          </Box>

          <Box>
            <Box>
              <Divider
                marginBottom="l"
                marginTop="m"
                style={styles.headerDivider}
              />
              <Box
                flexDirection="row"
                justifyContent="space-between"
                marginBottom="s"
                marginHorizontal="l"
                alignItems="center">
                <Text color="text" fontSize={16} fontWeight="bold">
                  USA Apple Itunes
                </Text>
                <Text color="success" fontSize={16} fontWeight="bold">
                  x 4cards
                </Text>
              </Box>

              <Divider marginTop="m" style={styles.headerDivider} />
            </Box>
            <Box>
              <Box
                marginTop="l"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom="s"
                marginHorizontal="l"
                alignItems="center">
                <Text color="primary" fontSize={24}>
                  2,000.00
                </Text>
                <Text color="primary" fontSize={12} fontWeight="bold">
                  USD
                </Text>
              </Box>

              <Divider marginTop="m" style={styles.headerDivider} />
            </Box>
            <Box>
              <Box
                marginTop="l"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom="s"
                marginHorizontal="l"
                alignItems="center">
                <Text color="success" fontSize={24}>
                  560,000.00
                </Text>
                <Text color="success" fontSize={12} fontWeight="bold">
                  USD
                </Text>
              </Box>
            </Box>
            <Box>
              <Box
                marginTop="l"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom="s"
                marginHorizontal="l"
                alignItems="center">
                <Text color="success" fontSize={12} fontWeight="bold">
                  April 5 - 2021
                </Text>
                <Text color="success" fontSize={12} fontWeight="bold">
                  10:36am
                </Text>
              </Box>
            </Box>
            <Box>
              <Box
                marginTop="l"
                justifyContent="flex-end"
                marginBottom="s"
                marginHorizontal="l"
                //
              >
                <Text color="primary" fontSize={13} textAlign="right">
                  No Optional comments
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
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
