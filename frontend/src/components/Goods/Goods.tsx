import { FC } from 'react';
import style from './Goods.module.css';
import { IGoods } from '../../utils/type/main';
import barcodeBlack from '../../images/icon_barcode-black.svg';

const Goods: FC<IGoods> = ({ img, title, clue, percentage, sku, sign }) => {
  return (
    <>
      <li className={style.li}>
        <div className={style.goods}>
          <div className={style.wrapper}>
            <div className={style.descriptionGoods}>
              <img className={style.img} src={img} alt='Бутылка гранатового сока' />
              <div className={style.description}>
                <h3 className={style.title}>{title}</h3>
                {clue ? (
                  <p className={style.clue}>{clue}</p>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <span className={style.percentage}>{percentage}</span>
          <span className={style.sku}>{sku}</span>
        </div>
        {sign === 'honest' || sign === 'IMEI' ? (
          <div className={style.footerGoods}>
            <img className={style.imgHint} src={barcodeBlack} alt='Иконка штрихкод черный' />
            {sign === 'honest' ? (
              <p className={style.text}>Отсканируйте Честный знак</p>
            ) : (
              <p className={style.text}>Отсканируйте IMEI</p>
            )}
          </div>
        ) : (
          ''
        )}
        </li>
    </>
  )
}

export default Goods;
