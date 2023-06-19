import { FC } from 'react';
import style from './ButtonModal.module.css';
import { ButtonModalProps } from '../../../utils/type/main';

const ButtonModal: FC<ButtonModalProps> = ({title, onClick, isOpen}) => {

  return (
    <>
      {isOpen !== true ?
        <button type='button' className={style.btn} onClick={onClick}>{title}</button>
      :
        <button type='button' className={style.btnDisable} onClick={onClick}>{title}</button>
      }
    </>
  )
}

export default ButtonModal;
