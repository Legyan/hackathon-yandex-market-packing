import { FC } from 'react';
import style from './OrderCompletedPage.module.css';
import goodJob from '../../images/good-job.jpg';
import { Link } from 'react-router-dom';

const OrderCompletedPage: FC = () => {
  return (
    <section className={style.wrapper}>
      <img className={style.img} src={goodJob} alt='Выполненая работа' />
      <h2 className={style.title}>Хорошая работа!</h2>
      <p className={style.description}>Продолжайте упаковывать заказы</p>
      <Link className={style.link} to='/'>ГОТОВО</Link>
    </section>
  )
}

export default OrderCompletedPage;