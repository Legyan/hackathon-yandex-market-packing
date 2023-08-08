import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import style from './MissinGoodsPage.module.css'
import Footer from "../../components/Footer/Footer";
import Goods from '../../components/Goods/Goods';
import icon from '../../images/smartSpeaker.svg'
import { v4 as uuid4 } from 'uuid';
import ModalCodeConfirm from '../../components/ModalCodeConfirm/ModalCodeConfirm';
import ButtonForm from '../../components/ui/ButtonForm/ButtonForm';

const MissinGoodsPage: FC = () => {
  const [isModalCodeConfirm, setModalCodeConfirm] = useState<boolean>(false);
  const history = useHistory();

  const mainPage = () => {
    history.replace({ pathname: '/' });
  }

  const openModalCodeConfirm = () => {
    setModalCodeConfirm(true)
  }

  const closeModalCodeConfirm = () => {
    setModalCodeConfirm(false);
  }

  return (
    <>
      <section className={style.wrapper}>
        <h1 className={style.title}>Выберите отсутствующий товар</h1>
        <ul className={style.goods}>
        <li className={style.liGoods} key={uuid4()}>
          <Goods
            img={icon}
            title={'Умная колонка Яндекс Станция Лайт, ультрафиолет'}
            percentage={`1 шт.`}
            sku={'ee69a7d66134af744f5c54a17a40cfb2'}
            imei={false}
            honest_sign={false}
            clue={false}
            defective_goods={false}
          />
        </li>
        </ul>
      </section>
      <Footer title='Назад'/>
    </>
  );
}

export default MissinGoodsPage;
