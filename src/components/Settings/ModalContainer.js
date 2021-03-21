import React from 'react';
import {StyleSheet} from 'react-native';

import PropTypes from 'prop-types';

import {Box} from 'components';

export const ModalContainer = ({children}) => {
  return <Box style={styles.modalContainer}>{children}</Box>;
};
const styles = StyleSheet.create({
  modalContainer: {padding: 22, paddingTop: 26},
});

ModalContainer.propTypes = {
  children: PropTypes.children,
};
