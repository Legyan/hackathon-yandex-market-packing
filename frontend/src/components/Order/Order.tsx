import { FC, useMemo } from 'react';
import { v4 as uuid4 } from 'uuid';
import style from './Order.module.css';
import Package from '../Package/Package';
import Goods from '../Goods/Goods';
import { IOrder } from '../../utils/type/main';
import { useSelector } from '../../utils/type/store';

const Order: FC<IOrder> = ({goods, order}) => {
  const alreadyPacked = useSelector(store => store.orderInfo.data?.already_packed);

  const choiceCartontype = useMemo(() => {
    if(alreadyPacked !== undefined) {
      const cartontype = alreadyPacked.map(pack => pack.cartontype);
      return cartontype
    } else {
      return null
    }
  }, [alreadyPacked]);

  const checkCartontype = useMemo(() => {
    const check = choiceCartontype?.find(i => i === goods.cartontype)
    return check
  }, [choiceCartontype, goods.cartontype]);

  const checkPackeged = useMemo(() => {
    if(alreadyPacked !== undefined) {
      const check = alreadyPacked?.map(packed => packed.is_packaged);
      return check[0]
    }
  }, [alreadyPacked]);

  return (
    <article className={
      checkPackeged ? `${style.wrpGoods} ${style.choicePercentage}` :
      checkCartontype ? `${style.wrpGoods}` :
      `${style.wrpGoods} ${style.disablePack}`}
      key={uuid4()}
    >
      <Package
        icon={goods.icontype}
        cartontype={goods.cartontype}
        visible={choiceCartontype!.includes(goods.cartontype)}
      />
      <ul className={style.goods}>
        {goods.items.map(i => order.goods.find(items => items.sku === i.sku)).map((item, index) => {
          return (
            <li className={
              alreadyPacked?.map(items => items.items.map(i => i.sku)).flat(1).includes(item!.sku) ?
                `${style.liGoods} ${style.choiceGoods}` :
                `${style.liGoods}`}
                key={uuid4()}>
              <Goods
                img={item!.image}
                title={`${item!.title} ${item!.description}`}
                percentage={`${item!.count} шт.`}
                sku={item!.sku}
                imei={item!.imei}
                honest_sign={item!.honest_sign}
                clue={item!.fragility}
                defective_goods={false}
              />
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export default Order;
