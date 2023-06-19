import { FC, useEffect, useState } from 'react';
import { ThreeCircles } from  'react-loader-spinner';
import { v4 as uuid4 } from 'uuid';
import style from './OrderPage.module.css';
import Footer from '../../components/Footer/Footer';
import Progressbar from '../../components/Progressbar/Progressbar';
import Package from '../../components/Package/Package';
import Goods from '../../components/Goods/Goods';
import ModalProblems from '../../components/ModalProblems/ModalProblems'
import BtnHasProblem from '../../components/ui/BtnHasProblem/BtnHasProblem';
import { useDispatch, useSelector } from '../../utils/type/store';
import { getOrder } from '../../services/actions/orderActions';
import ButtonMenu from '../../components/ui/ButtonMenu/ButtonMenu';
import { firstRecommendation } from '../../services/actions/recommendationAction';
import ModalBarcode from '../../components/ModalBarcode/ModalBarcode';
import ModalImei from '../../components/ModalImei/ModalImei';
import ModalHonest from '../../components/ModalHonest/ModalHonest';
import ButtonForm from '../../components/ui/ButtonForm/ButtonForm';
import { finishOrderApi } from '../../utils/api';
import { useHistory } from 'react-router-dom';

const OrderPage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalProblems, setModalProblems] = useState<boolean>(false);
  const [isModalBarcode, setModalBarcode] = useState<boolean>(false);
  const [isModalImei, setModalImei] = useState<boolean>(false);
  const [isModalHonest, setModalHonest] = useState<boolean>(false);
  const order = useSelector(store => store.orderInfo.data);
  const recommendationInfo = useSelector(store => store.recommendationInfo);
  const recommendation = useSelector(store => store.recommendationInfo.recommendation);
  const confirmation = useSelector(store => store.barcodeInfo)
  const alreadyPacked = useSelector(store => store.orderInfo.data?.already_packed);

  const firstRecommend = order !== null ? order.recomend_packing[0] : null;
  const choiceCartontype = alreadyPacked !== undefined ? alreadyPacked.map(pack => pack.cartontype) : null;

  console.log(confirmation);

  useEffect(() => {
    dispatch(getOrder())
  }, [])

  useEffect(() => {
    dispatch(firstRecommendation(firstRecommend))
  }, [firstRecommend])

  const openModalProblems = () => {
    setModalProblems(true)
  }

  const closeModalProblems = () => {
    setModalProblems(false);
  }

  const openModalBarcode = () => {
    setModalBarcode(true)
  }

  const closeModalBarcode = () => {
    setModalBarcode(false);
  }

  const closeModalImei = () => {
    setModalImei(false)
  }

  const closeModalHonest = () => {
    setModalHonest(false)
  }

  // if (confirmation.statusImei === 'ok') {
  //   openModalImei()
  // } else if (confirmation.statusHonest === 'ok') {
  //   openModalHonest()
  // } else if (confirmation.success) {
  //   closeModalBarcode();
  //   closeModalImei();
  //   closeModalHonest()
  // }

  const getPacked = async () => {
    try {
      await finishOrderApi()
        .then(res => {
          if (res && res.success) {
            console.log(res);
            history.push('/order/completed');
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {order !== null && firstRecommend !== null && recommendation !== null ?
        <section className={style.wrapper}>
          {/* Вывести в отдельный компонент */}
          <article className={style.wrapperGoods}>
            <Progressbar title={`Товары ячейки ${order.partition}`} />
            <div className={style.wrp}>
              {recommendation.map((goods, index) => {
                return (
                  <div className={
                    choiceCartontype?.find(i => i ===  goods.cartontype) ? `${style.wrpGoods}` :
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
                            `${style.liGoods}`} key={uuid4()}>
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
                  </div>
                )
              })}
            </div>
          </article>
          {/* Вывести в отдельный компонент */}
          <article className={style.packingGoods}>
            <h2 className={style.title}>Варианты упаковки</h2>
            <ul className={style.btns}>
              {order.recomend_packing.map((recomend, index) => {
                return (
                  <li className={style.li} key={uuid4()}>
                    <ButtonMenu
                      data={recomend}
                      index={index}
                      recomendnIndex={recommendationInfo.index}
                      active={recomend.find(rec => choiceCartontype !== null && choiceCartontype[0]?.includes(rec.cartontype)) !== undefined}
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
              <ButtonForm
                purpose={'order'}
                title={'УПАКОВАНО'}
                onClick={getPacked}
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
      <Footer onClick={openModalBarcode} />
      <ModalProblems
        visible={isModalProblems}
        onClose={closeModalProblems}
      />
      <ModalBarcode
        visible={isModalBarcode}
        onClose={closeModalBarcode}
        statusImei={setModalImei}
        stausHonest={setModalHonest}
      />
      <ModalImei
        visible={isModalImei}
        onClose={closeModalImei}
      />
      <ModalHonest
        visible={isModalHonest}
        onClose={closeModalImei}
      />
    </>
  )
}

export default OrderPage;