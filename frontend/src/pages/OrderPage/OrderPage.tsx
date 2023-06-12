import { FC, useRef, useState } from 'react';
import style from './OrderPage.module.css';
import Footer from '../../components/Footer/Footer';
import Progressbar from '../../components/Progressbar/Progressbar';
import Package from '../../components/Package/Package';
import Goods from '../../components/Goods/Goods';
import bootleJuice from '../../images/photo-goods/bottle_of_juice.jpg';
import column from '../../images/photo-goods/column.jpg';

const OrderPage: FC = () => {
  return (
    <>
      <section className={style.wrapper}>
        <div className={style.wrapperGoods}>
          <Progressbar title={'Товары ячейки B-09'} />
          <Package />
          <ul className={style.goods}>
            <Goods
              img={bootleJuice}
              title={'Сок гранатовый Nar Premium восстановленный для детского питания'}
              percentage={'1 шт.'}
              sku={'1334 5678 234 32'}
            />
            <Goods
              img={column}
              title={'Умная колонка Яндекс Станция Лайт, ультрафиолет'}
              clue={'Пузырчатая плёнка'}
              percentage={'1 шт.'}
              sku={'1334 5678 234 32'}
              sign={'honest'}
            />
          </ul>
        </div>
        <article className={style.packingGoods}>
          <h2>Варианты упаковки</h2>
        </article>
      </section>
      <Footer />
    </>
  )
}

export default OrderPage;
