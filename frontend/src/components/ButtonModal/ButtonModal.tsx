import { FC, PropsWithChildren } from 'react';
import style from './ButtonModal.module.css';

interface ButtonModalProps extends PropsWithChildren {
  title: string;
  onClick: () => void;
  isOpen?: boolean;
}

const ButtonModal: FC<ButtonModalProps> = ({...props}) => {

  return props.isOpen !== true ? (
    <>
    <button type='button' className={style.btn} onClick={props.onClick}>{props.title}</button>
    </>
  ) : (
    <>
    <button type='button' className={style.btnDisable} onClick={props.onClick}>{props.title}</button>
    </>
  )

}

export default ButtonModal;