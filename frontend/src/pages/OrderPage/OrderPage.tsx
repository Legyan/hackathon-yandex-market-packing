import { FC, useRef, useState } from 'react';
import style from './OrderPage.module.css';
import Footer from '../../components/Footer/Footer';
import Progressbar from '../../components/Progressbar/Progressbar';
import chevron from '../../images/icon_chevron.svg';
import { data } from '../../utils/data';
import Package from '../../components/Package/Package';

const OrderPage: FC = () => {
  return (
    <>
      <section className={style.wrapper}>
        <div className={style.goods}>
        <Progressbar title={'Товары ячейки B-09'} />
        <Package />
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
