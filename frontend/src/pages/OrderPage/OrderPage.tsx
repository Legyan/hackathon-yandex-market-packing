import { FC, useEffect, useState } from 'react';
import { ThreeCircles } from  'react-loader-spinner'
import style from './OrderPage.module.css';
import Footer from '../../components/Footer/Footer';
import Progressbar from '../../components/Progressbar/Progressbar';
import Package from '../../components/Package/Package';
import Goods from '../../components/Goods/Goods';
import bootleJuice from '../../images/photo-goods/bottle_of_juice.jpg';
import column from '../../images/photo-goods/column.jpg';
import ButtonMenu from '../../components/ui/ButtonMenu/ButtonMenu';
import ButtonLink from '../../components/ui/ButtonLink/ButtonLink';
import ModalProblems from '../../components/ModalProblems/ModalProblems'
import BtnHasProblem from '../../components/ui/BtnHasProblem/BtnHasProblem';
import { useDispatch, useSelector } from '../../utils/type/store';
import { getOrder } from '../../services/actions/orderActions';
import { IRecPacking } from '../../utils/type/main';
import Menu from '../../components/Menu/Menu';



const OrderPage: FC = () => {
  const dispatch = useDispatch();
  const [isModalProblems, setModalProblems] = useState<boolean>(false);
  const order = useSelector(store => store.orderInfo.data);

  console.log(order);

  useEffect(() => {
    dispatch(getOrder())
  }, [])

  const openModalProblems = () => {
    setModalProblems(true)
  }

  const closeModalProblems = () => {
    setModalProblems(false);
  }

  return (
    <>
    {order !== null ?
      <section className={style.wrapper}>
        <div className={style.wrapperGoods}>
          <Progressbar title={`Товары ячейки ${order.partition}`} />
          <Package />
          <ul className={style.goods}>
            <Goods
              img={bootleJuice}
              title={'Сок гранатовый Nar Premium восстановленный для детского питания'}
              percentage={'1 шт.'}
              sku={'1334 5678 234 32'}
            />
            <Goods
              img={column}
              title={'Умная колонка Яндекс Станция Лайт, ультрафиолет'}
              clue={'Пузырчатая плёнка'}
              percentage={'1 шт.'}
              sku={'1334 5678 234 32'}
              sign={'honest'}
            />
          </ul>
        </div>
        <article className={style.packingGoods}>
          <h2 className={style.title}>Варианты упаковки</h2>
          <div className={style.btns}>
            <Menu recommend={order.recomend_packing} />
          </div>
          <div className={style.links}>
            <BtnHasProblem
            onClick={openModalProblems}
            title='Есть проблема'
            />
            <ButtonLink
              purpose={'order'}
              title={'УПАКОВАНО'}
              link={'/order/completed'}
            />
          </div>
        </article>
      </section> :
      <article className={style.threeCircles}>
        <ThreeCircles
          height="100"
          width="100"
          color="#FED42B"
          wrapperStyle={{}}
          visible={true}
          ariaLabel="three-circles-rotating"
        />
      </article>
    }
      <Footer />
      <ModalProblems
      visible={isModalProblems}
      onClose={closeModalProblems}
      />
      </>
  )
}

export default OrderPage;
