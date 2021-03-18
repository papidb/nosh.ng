import React, {useRef} from 'react';
import {Modalize} from 'react-native-modalize';

const BaseModalize = (props, ref) => (
  <Modalize
    ref={ref}
    withHandle={false}
    modalStyle={{
      borderTopLeftRadius: 38,
      borderTopRightRadius: 38,
    }}
    adjustToContentHeight
    {...props}
  />
);

export const NoshModalize = React.forwardRef(BaseModalize);
