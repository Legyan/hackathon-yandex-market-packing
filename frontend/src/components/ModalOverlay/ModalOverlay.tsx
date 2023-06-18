import React, { FC, MouseEventHandler } from 'react';
import { IModalOverlay } from '../../utils/type/main';
import style from './ModalOverlay.module.css'

const ModalOverlay: FC<IModalOverlay> = ({visible, closeModal}) => {

  const handleOverlay: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className={
        visible ? `${style.modal} ${style.modalOpened}` : `${style.modal}`
      }
      onClick={handleOverlay}
    ></div>
  );
}

export default ModalOverlay;