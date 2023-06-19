import { FC } from 'react';
import style from './Goods.module.css';
import { IGoodsProps } from '../../utils/type/main';
import barcodeBlack from '../../images/icon_barcode-black.svg';
import exclamation_mark from '../../images/exclamation_mark.svg'
import { useSelector } from '../../utils/type/store';

const Goods: FC<IGoodsProps> = ({
  img,
  title,
  percentage,
  sku,
  imei,
  honest_sign,
  clue,
  defective_goods,
}) => {
  const alreadyPacked = useSelector(store => store.orderInfo.data?.already_packed);

  console.log(alreadyPacked);

  return (
    <>
      <div className={style.goods}>
        <div className={style.wrapper}>
          <div className={style.descriptionGoods}>
            <img className={style.img} src={img} alt='Товар' />
            <div className={style.description}>
              <h3 className={style.title}>{title}</h3>
              {clue ? (
                <p className={style.clue}>Пузырчетая плёнка</p>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <span className={
          alreadyPacked?.map(items => items.items.map(i => i.sku)).flat(1).includes(sku) ?
          `${style.percentage} ${style.choicePercentage}` :
          `${style.percentage}`}
        >
          {percentage}
        </span>
        <span className={style.sku}>{sku}</span>
      </div>
      {honest_sign || imei ? (
        <div className={style.footerGoods}>
          <img className={style.imgHint} src={barcodeBlack} alt='Иконка штрихкод черный' />
          {honest_sign ? (
            <p className={style.text}>Отсканируйте Честный знак</p>
          ) : (
            <p className={style.text}>Отсканируйте IMEI</p>
          )}
        </div>
      ) : (
        ''
      )}
      {defective_goods ? (
        <div className={style.wrapperDG}>
          <img src={exclamation_mark} alt="exclamation mark" className={style.iconExclamationMark} />
        <p className={style.textDG}>Товар бракован</p>
        </div>
      ) : ('')}
    </>
  )
}

export default Goods;
