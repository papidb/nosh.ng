import React from 'react';
import {ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {Box, Text, Divider, Button, HeaderInfo, Icon} from 'components';
import images from 'constants/images';

export const GiftCard = () => {
  return (
    <Box flex={1}>
      <Divider marginBottom="l" />
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <HeaderInfo text="SWIPE THROUGH TO SELECT CATEGORY" />
        {/* Content */}

        <Box>
          <Box
            alignItems="center"
            marginVertical={{bigScreen: 'xxl', phone: 'xl'}}>
            <Box height={250}>
              <Text>Cards</Text>
            </Box>
          </Box>

          {/* Bottom */}
          <Text
            color="primary"
            fontWeight="600"
            textAlign="center"
            fontSize={12}
            marginBottom="m">
            CLICK HERE TO BEGIN
          </Text>

          <Button variant="giftcard" text="Ebay" />
        </Box>
      </ScrollView>
      <Box paddingHorizontal="l" marginBottom="l">
        <Divider />
        {/* Nosh Wallet */}
        <TouchableOpacity>
          <Box
            marginTop="s"
            // flex={1}
            backgroundColor="mostBg"
            borderRadius={100}
            padding="m"
            paddingLeft="xl"
            paddingRight="l"
            justifyContent="space-between"
            flexDirection="row"
            alignItems="center">
            <Text color="primary" fontWeight="bold">
              NOSH WALLET
            </Text>
            <Icon name="icon-forwardgreen" size={14} />
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  scrollView: {flex: 1, paddingHorizontal: 20},
});
