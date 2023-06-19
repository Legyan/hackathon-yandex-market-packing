import { FC, useEffect, useState } from 'react';
import { ThreeCircles } from  'react-loader-spinner';
import { v4 as uuid4 } from 'uuid';
import style from './OrderPage.module.css';
import Footer from '../../components/Footer/Footer';
import Progressbar from '../../components/Progressbar/Progressbar';
import Package from '../../components/Package/Package';
import Goods from '../../components/Goods/Goods';
import ButtonLink from '../../components/ui/ButtonLink/ButtonLink';
import ModalProblems from '../../components/ModalProblems/ModalProblems'
import BtnHasProblem from '../../components/ui/BtnHasProblem/BtnHasProblem';
import { useDispatch, useSelector } from '../../utils/type/store';
import { getOrder } from '../../services/actions/orderActions';
import ButtonMenu from '../../components/ui/ButtonMenu/ButtonMenu';
import { firstRecommendation } from '../../services/actions/recommendationAction';

const OrderPage: FC = () => {
  const dispatch = useDispatch();
  const [isModalProblems, setModalProblems] = useState<boolean>(false);
  const order = useSelector(store => store.orderInfo.data);
  const recommendationInfo = useSelector(store => store.recommendationInfo)
  const recommendation = useSelector(store => store.recommendationInfo.recommendation)

  console.log(order);

  console.log(recommendation);

  const firstRecommend = order !== null ? order.recomend_packing[0] : null;

  useEffect(() => {
    dispatch(getOrder())
  }, [])

  useEffect(() => {
    dispatch(firstRecommendation(firstRecommend))
  }, [dispatch, firstRecommend])

  const openModalProblems = () => {
    setModalProblems(true)
  }

  const closeModalProblems = () => {
    setModalProblems(false);
  }

  return (
    <>
    {order !== null && firstRecommend !== null && recommendation !== null ?
      <section className={style.wrapper}>
        {/* Вывести в отдельный компонент */}
        <article className={style.wrapperGoods}>
          <Progressbar title={`Товары ячейки ${order.partition}`} />
            {recommendation.map(goods => {
              return (
                <div key={uuid4()}>
                  <Package icon={goods.icontype} title={goods.cartontype} />
                  <ul className={style.goods}>
                    {goods.items.map(i => order.goods.find(item => item.sku === i.sku)).map(goods => {
                      return (
                        <li className={style.liGoods} key={uuid4()}>
                          <Goods
                            img={goods!.image}
                            title={`${goods!.title} ${goods!.description}`}
                            percentage={`${goods!.count} шт.`}
                            sku={goods!.sku}
                            imei={goods!.imei}
                            honest_sign={goods!.honest_sign}
                            clue={goods!.fragility}
                            defective_goods={false}
                          />
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
        </article>
        {/* Вывести в отдельный компонент */}
        <article className={style.packingGoods}>
          <h2 className={style.title}>Варианты упаковки</h2>
          <ul className={style.btns}>
            {order.recomend_packing.map((recomend, index) => {
              return(
                <li className={style.li} key={uuid4()}>
                  <ButtonMenu
                    data={recomend}
                    index={index}
                    recomendnIndex={recommendationInfo.index}
                  />
                </li>
              )
            })}
          </ul>
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
