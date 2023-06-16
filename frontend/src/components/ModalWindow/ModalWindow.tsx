import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import style from './ModalWindow.module.css';
import { modalContainer, body } from '../../utils/constants';
import { IModalWindow } from '../../utils/type/main';


const ModalWindow: FC<IModalWindow> = ( props ) => {

  useEffect(() => {
    const handleEscClose = (e: {key: string}) => {
      if (e.key === 'Escape') {props.onClose()}
    }

    if (props.visible) {
      document.addEventListener('keydown', handleEscClose);
      body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      body.style.overflow = 'visible';
    };
  }, [props, props.visible]);

  return ReactDOM.createPortal(
    <div
      className={
        props.visible
          ? `${style.modal} ${style.modalOpened}`
          : `${style.modal}`
      }
    >
      <ModalOverlay closeModal={props.onClose} visible={props.visible} />

        <div className={style.container}>
          <button className={style.btnClose} onClick={props.onClose} />
          {props.children}
        </div>

    </div>,

    modalContainer
  );
}

export default ModalWindow;
