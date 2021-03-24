import React, {useRef} from 'react';

import {NoshModalize} from 'components';

// THIS ISN'T REALLY A HOOK
export const useModalize = () => {
  const modalizeRef = useRef(null);
  const openModal = () => {
    modalizeRef.current?.open();
  };
  const closeModal = () => {
    modalizeRef.current?.close();
  };
  const Component = (props) => <NoshModalize ref={modalizeRef} {...props} />;
  return {openModal, closeModal, Component};
};
