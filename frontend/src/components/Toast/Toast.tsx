import { FC } from 'react';
import style from './Toast.module.css';
import { ToastProps } from '../../utils/type/main';
import { useLocation } from 'react-router-dom';

const Toast: FC<ToastProps> = ({
  text,
  nameBtnCancel,
  nameBtnСontinue,
  img,
  imgAlt,
  isOpen,
  onClose,
  onClick,
}) => {
  const location = useLocation();

  return (
    <>
      {isOpen &&
        <section className={`${style.modal} ${style.modalOpened}`}>
          <div className={
            location.pathname === '/order' ? `${style.container} ${style.wrpPacking}` :
            `${style.container}`
          }>
            <img src={img} alt={imgAlt} className={style.imgIcon} />
            <p className={style.text}>{text}</p>
            <button className={`${style.btn} ${style.btnCancel}`} onClick={onClose}>{nameBtnCancel}</button>
            <button className={`${style.btn} ${style.btnСontinue}`} onClick={onClick}>{nameBtnСontinue}</button>
          </div>
        </section>
      }
    </>
  )
}

export default Toast;
