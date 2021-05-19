import React from 'react';
import {StyleSheet, Keyboard} from 'react-native';

import {Modalize} from 'react-native-modalize';

const BaseModalize = (props, ref) => (
  <Modalize
    ref={ref}
    withHandle={false}
    modalStyle={styles.modalStyle}
    childrenStyle={styles.childrenStyle}
    adjustToContentHeight
    onClose={() => {
      try {
        Keyboard.dismiss();
      } catch (error) {}
    }}
    {...props}
  />
);

const styles = StyleSheet.create({
  modalStyle: {
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
  },
  childrenStyle: {
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
  },
});
export const NoshModalize = React.forwardRef(BaseModalize);
