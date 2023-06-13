import { FC } from 'react';
import style from './Package.module.css';
import openBox from '../../images/box_open.png';
import chevron from '../../images/icon_chevron.svg';
import Hint from '../ui/Hint/Hint';

const Package: FC = () => {
  return (
    <article className={style.wrapper}>
      <div className={style.wrapperPacking}>
      <img src={openBox} className={style.imgBox} alt='Открытая коробка' />
        <div className={style.descriptionPacking}>
          <h3 className={style.sku}>L EA12344</h3>
          <div className={style.hints}>
            <ul className={style.hintWrapper}>
              <Hint icon={'pen'} title={'Изменить состав коробки'} />
              <Hint icon={'barcodeRed'} title={'Распечатайте штрихкод'} />
            </ul>
          </div>
        </div>
      </div>
      <button className={style.btn}>
        <span className={style.span}>Свернуть</span>
        <img className={style.chevron} src={chevron} alt='Шеврон' />
      </button>
    </article>
  )
}

export default Package;
