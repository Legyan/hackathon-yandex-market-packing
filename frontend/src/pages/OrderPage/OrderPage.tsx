import { FC, useState } from 'react';
import style from './OrderPage.module.css';
import Footer from '../../components/Footer/Footer';
import Progressbar from '../../components/Progressbar/Progressbar';
import Package from '../../components/Package/Package';
import Goods from '../../components/Goods/Goods';
import bootleJuice from '../../images/photo-goods/bottle_of_juice.jpg';
import column from '../../images/photo-goods/column.jpg';
import iconBox from '../../images/icon_box.svg';
import pack from '../../images/icon_package.svg';
import ButtonMenu from '../../components/ui/ButtonMenu/ButtonMenu';
import ButtonLink from '../../components/ui/ButtonLink/ButtonLink';

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
          <h2 className={style.title}>Варианты упаковки</h2>
          <div className={style.btns}>
            <ButtonMenu
              icon={iconBox}
              description={'L EA12344'}
              activeButton={'active'}
            />
            <ButtonMenu
              icon={iconBox}
              description={'M EЗ12344'}
              activeButton={'notSelection'}
              count={'2 шт.'}
            />
            <ButtonMenu
              icon={pack}
              description={'L EЗ12344'}
              activeButton={'inactive'}
              count={'2 шт.'}
              disabled
            />
          </div>
          <div className={style.links}>
            <ButtonLink
              purpose={'anotherProblem'}
              title={'ЕСТЬ ПРОБЛЕМА'}
              link={'/problems/another'}
            />
            <ButtonLink
              purpose={'order'}
              title={'УПАКОВАНО'}
              link={'/order/completed'}
            />
          </div>
        </article>
      </section>
      <Footer />
    </>
  )
}

export default OrderPage;
