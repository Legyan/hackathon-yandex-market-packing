import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import style from './ModalWindow.module.css';
import { modalContainer, body } from '../../utils/constants';
import { IModal } from '../../utils/type/main';


const ModalWindow: FC<IModal> = ({
  visible,
  onClose,
  children,
  setValue,
  setError
}) => {

  useEffect(() => {
    const handleEscClose = (e: {key: string}) => {
      if (e.key === 'Escape') {
        onClose();
        setValue && setValue('');
        setError && setError('');
      }
    }

    if (visible) {
      document.addEventListener('keydown', handleEscClose);
      body.style.overflow = 'hidden';
      setValue && setValue('');
      setError && setError('');
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      body.style.overflow = 'visible';
    };
  }, [onClose, setError, setValue, visible]);

  return ReactDOM.createPortal(
    <div
      className={
        visible
          ? `${style.modal} ${style.modalOpened}`
          : `${style.modal}`
      }
    >
      <ModalOverlay closeModal={onClose} visible={visible} />

        <div className={style.container}>
          <button className={style.btnClose} onClick={onClose} />
          {children}
        </div>

    </div>,

    modalContainer
  );
}

export default ModalWindow;
