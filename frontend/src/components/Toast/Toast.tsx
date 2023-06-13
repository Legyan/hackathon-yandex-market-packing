import { FC, PropsWithChildren } from 'react';
import style from './Toast.module.css';

interface ToastProps extends PropsWithChildren {
  text: string;
  nameBtnCancel: string;
  nameBtnСontinue: string;
  img: string;
  imgAlt: string;
  isOpen?: boolean;
  onClose: () => void;
  onClick: () => void;
}

const Toast: FC<ToastProps> = ( props: ToastProps) => {

  return (
    <>
    {props.isOpen &&
    <section className={`${style.modal} ${style.modalOpened}`}>
      <div className={style.container}>
        <img src={props.img} alt={props.imgAlt} className={style.imgIcon} />
        <p className={style.text}>{props.text}</p>
        <button className={style.btnCancel} onClick={props.onClose}>{props.nameBtnCancel}</button>
        <button className={style.btnСontinue} onClick={props.onClick}>{props.nameBtnСontinue}</button>
      </div>
    </section>
}
    </>
  )
}

export default Toast;
