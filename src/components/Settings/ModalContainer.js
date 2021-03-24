import React from 'react';
import {StyleSheet} from 'react-native';

import PropTypes from 'prop-types';

import {Box} from 'components';

export const ModalContainer = (props) => {
  return <Box style={styles.modalContainer} {...props} />;
};
const styles = StyleSheet.create({
  modalContainer: {padding: 22, paddingTop: 26},
});

ModalContainer.propTypes = {
  children: PropTypes.children,
};
