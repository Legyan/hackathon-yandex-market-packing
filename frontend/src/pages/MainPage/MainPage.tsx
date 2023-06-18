import { FC, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import style from './MainPage.module.css'
import Progressbar from '../../components/Progressbar/Progressbar';
import Footer from '../../components/Footer/Footer';
import ButtonForm from '../../components/ui/ButtonForm/ButtonForm';
import { setCookie } from '../../utils/cookie';
import Statistics from '../Statistics/Statistics';
import { useDispatch, useSelector } from '../../utils/type/store';
import { getUser } from '../../services/actions/userActions';

const MainPage: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(stor => stor.userInfo.user);

  console.log(user);

  useEffect(() => {
    dispatch(getUser())
  }, [])

  const solveProblem = () => {
    history.replace({ pathname: '/problems/another' });
  }

  const logout = useCallback(() => {
    setCookie('token', '');
    history.replace({ pathname: '/table' });
  }, [history])

  const order = () => {
    history.replace({ pathname: '/order' });
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
