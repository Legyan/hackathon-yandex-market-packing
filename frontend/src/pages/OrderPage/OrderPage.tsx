import { FC, useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from '../../utils/type/store';
import { v4 as uuid4 } from 'uuid';
import { ThreeCircles } from  'react-loader-spinner';
import style from './OrderPage.module.css';
import Footer from '../../components/Footer/Footer';
import Progressbar from '../../components/Progressbar/Progressbar';
import ModalProblems from '../../components/ModalProblems/ModalProblems'
import BtnHasProblem from '../../components/ui/BtnHasProblem/BtnHasProblem';
import { getOrder } from '../../services/actions/orderActions';
import { selectRecommendation } from '../../services/actions/recommendationAction';
import ModalBarcode from '../../components/ModalBarcode/ModalBarcode';
import ModalImei from '../../components/ModalImei/ModalImei';
import ModalHonest from '../../components/ModalHonest/ModalHonest';
import ButtonForm from '../../components/ui/ButtonForm/ButtonForm';
import { finishOrderApi } from '../../utils/api';
import Order from '../../components/Order/Order';
import PackagingOptions from '../../components/PackagingOptions/PackagingOptions';
import ModalNoOrders from '../../components/ModalNoOrders/ModalNoOrders';
import { IRecPacking } from '../../utils/type/data';

const OrderPage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalProblems, setModalProblems] = useState<boolean>(false);
  const [isModalBarcode, setModalBarcode] = useState<boolean>(false);
  const [isModalImei, setModalImei] = useState<boolean>(false);
  const [isModalHonest, setModalHonest] = useState<boolean>(false);
  const [isModalNoOrders, setModalNoOrders] = useState<boolean>(false);
  const [choicePacked, setChoicePacked] = useState<Array<IRecPacking> | null>(null)
  const [counter, setCounter] = useState<number>(0);
  const order = useSelector(store => store.orderInfo.data);
  const orderInfo = useSelector(store => store.orderInfo);
  const recommendation = useSelector(store => store.recommendationInfo.recommendation);
  const alreadyPacked = useSelector(store => store.orderInfo.data?.already_packed);

  useEffect(() => {
    if(orderInfo.status === 'No orders to pack') {
      setModalNoOrders(true);
    }
  }, [orderInfo.status])

  useEffect(() => {
    dispatch(getOrder())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    let length = order?.recomend_packing.length
    if (alreadyPacked !== undefined && order !== null) {
      alreadyPacked.forEach(readyPack => {
        setCounter(prev => prev + 1);
        (order.recomend_packing.forEach(recomendPack => recomendPack.forEach(pack => {
          if (pack.cartontype === readyPack.cartontype) {
            setChoicePacked([pack]);
          } else if (counter === length!) {
            setCounter(0)
          }
        })))
      });
    }
  }, [alreadyPacked])

  const firstRecommend = useMemo(() => {
    if(order !== null && order.already_packed.length === 0) {
      const recommendationOrder = order.recomend_packing[0];
      return recommendationOrder;
    } else if(choicePacked !== null) {
      const recommendationOrder = choicePacked
      return recommendationOrder
    }
  }, [choicePacked, order]);

  useEffect(() => {
    firstRecommend !== undefined && choicePacked !== null && dispatch(selectRecommendation(firstRecommend, counter))
  }, [choicePacked, firstRecommend])

  const isPackaged = useMemo(() => {
    if(alreadyPacked !== undefined) {
      let packaged = alreadyPacked.map((pack => pack.is_packaged))
      return packaged[0]
    }
  }, [alreadyPacked])

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

  const closeModalNoOrders = () => {
    setModalNoOrders(false)
  }

  const getPacked = async () => {
    try {
      const res = await finishOrderApi()
      if (res.status === 'ok') {
        console.log(res);
        history.push('/order/completed');
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {order !== null && recommendation !== null ?
        <section className={style.wrapper}>
          <article className={style.wrapperGoods}>
            <Progressbar title={`Товары ячейки ${order.partition}`} />
            <div className={style.wrp}>
              {recommendation.map((goods, index) => {
                return (
                  <Order goods={goods} order={order} key={uuid4()} />
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
                disable={!isPackaged}
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
      <ModalNoOrders
        visible={isModalNoOrders}
        onClose={closeModalNoOrders}
      />
    </>
  )
}

export default OrderPage;
