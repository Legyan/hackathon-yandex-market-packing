import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import style from './MainPage.module.css'
import Progressbar from '../../components/Progressbar/Progressbar';
import Footer from '../../components/Footer/Footer';
import ButtonForm from '../../components/ui/ButtonForm/ButtonForm';
import { setCookie } from '../../utils/cookie';
import Statistics from '../../components/Statistics/Statistics';
import { logoutApi } from '../../utils/api';
import { useDispatch } from '../../utils/type/store';
import { getUser } from '../../services/actions/userActions';

const MainPage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUser())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const solveProblem = () => {
    history.replace({ pathname: '/problems/another' });
  }

  const logout = async () => {
    try {
      const res = await logoutApi()
      if (res.status === 'ok') {
        history.replace({ pathname: '/table' });
      }
    } catch(error) {
      console.log(error)
    }
    setCookie('token', '');
    setCookie('barcode', '');
  }

  const order = () => {
    history.push({ pathname: '/order' });
  }

  return (
    <>
      <section className={style.wrapper}>
        <div className={style.btnsWrapper}>
          <ButtonForm
            purpose={'problem'}
            title={'Есть проблема'}
            onClick={solveProblem}
          />
          <ButtonForm
            purpose={'logout'}
            title={'Закрыть стол'}
            onClick={logout}
          />
        </div>
        <div className={style.statWrapper}>
          <Progressbar title={'Упаковка'} />
          <Statistics />
        </div>
        <ButtonForm
          purpose={'package'}
          title={'Получить заказ'}
          onClick={order}
        />
      </section>
      <Footer />
    </>
  )
}

export default MainPage;
