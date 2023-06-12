import { FC } from 'react';
import style from './DefectiveGoods.module.css';
import basket from '../../images/Basket.svg';
import FooterBack from '../../components/FooterBack/FooterBack';

const DefectiveGoods: FC = () => {
  return (
    <>
    <section className={style.defectiveGoods}>
      <div className={style.wrapp}>
    <img className={style.imgBasket} src={basket} alt="корзина" />
    <h2 className={style.title}>Положите бракованные товары в тару</h2>
    </div>
    <button className={style.btnPacked}>УПАКОВАНО</button>
    </section>
    <FooterBack link='/problems' title='Назад'/>
    </>
  )
}

export default DefectiveGoods;
