import { FC } from 'react';
import style from './DefectiveGoods.module.css';
import basket from '../../images/Basket.svg';
import Footer from '../../components/Footer/Footer';

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
    <Footer title='Назад'/>
    </>
  )
}

export default DefectiveGoods;
