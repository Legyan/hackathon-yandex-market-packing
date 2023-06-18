import { FC } from 'react';
import style from './Hint.module.css';
import pen from '../../../images/Icon_pen.svg';
import barcodeRed from '../../../images/icon_barcode-red.svg';
import { IHint } from '../../../utils/type/main';

const Hint: FC<IHint> = ({icon, title}) => {

  return (
    <li className={
      icon === 'pen' ? `${style.hintBtn} ${style.hintShadow}` : `${style.hint}`}
    >
      {icon === 'pen' ? (
        <button className={style.btn}>
          <img className={`${style.imgHint}`} src={pen} alt='Иконка ручки' />
          <p className={style.title}>{title}</p>
        </button>
      ) : (
        <>
          <img className={`${style.imgHint} ${style.imgHint}`} src={barcodeRed} alt='Иконка штрихкод красный' />
          <p className={style.title}>{title}</p>
        </>
      )}
    </li>
  )
}

export default Hint;
