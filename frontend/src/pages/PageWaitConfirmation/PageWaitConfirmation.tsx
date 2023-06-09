import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import style from './PageWaitConfirmation.module.css'
import Footer from "../../components/Footer/Footer";
import Goods from '../../components/Goods/Goods';
import icon from '../../images/smartSpeaker.svg'
import { v4 as uuid4 } from 'uuid';
import ModalCodeConfirm from '../../components/ModalCodeConfirm/ModalCodeConfirm';
import ButtonForm from '../../components/ui/ButtonForm/ButtonForm';
import { IPageWaitConfirmation } from '../../utils/type/main';


const PageWaitConfirmation: FC<IPageWaitConfirmation> = ({title}) => {
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

// После подтверждения бригадира, титл должен меняться на 'Подтверждение бригадира получено. Верните товары на полку и отмените заказ'

  return (
    <>
      <section className={style.wrapper}>
        <h1 className={style.title}>{'Ожидайте подтверждение бригадира'}</h1>
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
            defective_goods={true}
          />
        </li>
        </ul>
        <ButtonForm
          purpose={'cancelOrder'}
          title={'Отменить заказ'}
          onClick={mainPage}
        />
      </section>
      <Footer onClick={openModalCodeConfirm} />
      <ModalCodeConfirm
      visible={isModalCodeConfirm}
      onClose={closeModalCodeConfirm}
      />
    </>
  );
}

export default PageWaitConfirmation;