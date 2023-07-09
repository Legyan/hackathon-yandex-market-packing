import { FC, useState } from 'react';
import style from './Package.module.css';
import openBox from '../../images/box_open.png';
import openPocket from '../../images/pocket_open.png';
import stretch from '../../images/stretch.png';
import nonpack from '../../images/nonpack.png';
import chevron from '../../images/icon_chevron.svg';
import Hint from '../ui/Hint/Hint';
import { IPackage } from '../../utils/type/main';

const Package: FC<IPackage> = ({
  icon,
  cartontype,
  visible,
}) => {

  return (
    <article className={style.wrapper}>
      <div className={style.wrapperPacking}>
      {
        icon === 'box' ? <img src={openBox} className={style.imgBox} alt='Открытая коробка' /> :
        icon === 'packet' ? <img src={openPocket} className={style.imgBox} alt='Открытая коробка' /> :
        icon === 'STRETCH' ? <img src={stretch} className={style.imgBox} alt='Открытая коробка' /> :
        icon === 'NONPACK' ? <img src={nonpack} className={style.imgBox} alt='Открытая коробка' /> :
        ''
      }

        <div className={style.descriptionPacking}>
          <h3 className={style.sku}>{cartontype}</h3>
          <div className={style.hints}>
            <ul className={style.hintWrapper}>
              <Hint icon={'pen'} title={'Изменить состав коробки'} visible={visible} />
              <Hint icon={'barcodeRed'} title={'Закрыть коробку'} visible={visible} />
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
