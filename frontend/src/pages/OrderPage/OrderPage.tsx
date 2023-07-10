import { FC, useEffect, useState } from 'react';
import { ThreeCircles } from  'react-loader-spinner';
import style from './OrderPage.module.css';
import Footer from '../../components/Footer/Footer';
import Progressbar from '../../components/Progressbar/Progressbar';
import ModalProblems from '../../components/ModalProblems/ModalProblems'
import BtnHasProblem from '../../components/ui/BtnHasProblem/BtnHasProblem';
import { useDispatch, useSelector } from '../../utils/type/store';
import { getOrder } from '../../services/actions/orderActions';
import { firstRecommendation } from '../../services/actions/recommendationAction';
import ModalBarcode from '../../components/ModalBarcode/ModalBarcode';
import ModalImei from '../../components/ModalImei/ModalImei';
import ModalHonest from '../../components/ModalHonest/ModalHonest';
import ButtonForm from '../../components/ui/ButtonForm/ButtonForm';
import { finishOrderApi } from '../../utils/api';
import { useHistory } from 'react-router-dom';
import Order from '../../components/Order/Order';
import PackagingOptions from '../../components/PackagingOptions/PackagingOptions';

const OrderPage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalProblems, setModalProblems] = useState<boolean>(false);
  const [isModalBarcode, setModalBarcode] = useState<boolean>(false);
  const [isModalImei, setModalImei] = useState<boolean>(false);
  const [isModalHonest, setModalHonest] = useState<boolean>(false);
  const order = useSelector(store => store.orderInfo.data);
  const recommendation = useSelector(store => store.recommendationInfo.recommendation);
  const confirmation = useSelector(store => store.barcodeInfo)
  const firstRecommend = order !== null ? order.recomend_packing[0] : null;;

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
          <article className={style.wrapperGoods}>
            <Progressbar title={`Товары ячейки ${order.partition}`} />
            <div className={style.wrp}>
              {recommendation.map((goods, index) => {
                return (
                  <Order goods={goods} order={order} />
                )
              })}
            </div>
          </article>
          <article className={style.packingGoods}>
            <h2 className={style.title}>Варианты упаковки</h2>
            <PackagingOptions order={order} />
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