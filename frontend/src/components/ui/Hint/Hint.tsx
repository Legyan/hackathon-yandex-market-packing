import { FC, useState } from 'react';
import style from './Hint.module.css';
import pen from '../../../images/Icon_pen.svg';
import lock from '../../../images/icon_lock.svg';
import { IHint } from '../../../utils/type/main';
import { closeBoxApi } from '../../../utils/api';
import ToastPrintBarcode from '../../ToastPrintBarcode/ToastPrintBarcode';

const Hint: FC<IHint> = ({icon, title, visible}) => {

  const [isToastPrintBarcode, setToastPrintBarcode] = useState(false);

  const openToastPrintBarcode = () => {
    setToastPrintBarcode(true);
  }

  const closeToastPrintBarcode = () => {
    setToastPrintBarcode(false);
  }


  const closeBox = async () => {
    try {
      await closeBoxApi()
        .then(res => {
          if (res.status === 'ok') {
            setToastPrintBarcode(false);
          }
        })
    } catch(error) {
      console.log(error)
    }

  }

  return (
    <>
    <li className={
      visible ? `${style.hintBtn} ${style.hintShadow}` :
      `${style.btnWrp} ${style.hintShadow}`
    }>
      {icon === 'pen' ? (
        <button className={style.btn}>
          <img className={`${style.imgHint}`} src={pen} alt='Иконка ручки' />
          <p className={style.title}>{title}</p>
        </button>
      ) : (
        <button className={style.btn} onClick={openToastPrintBarcode}>
          <img className={`${style.imgHint}`} src={lock} alt='Иконка замка' />
          <p className={style.title}>{title}</p>
        </button>
      )}
    </li>
    <ToastPrintBarcode isOpen={isToastPrintBarcode} onClick={closeBox} onClose={closeToastPrintBarcode} />
    </>
  )
}

export default Hint;
