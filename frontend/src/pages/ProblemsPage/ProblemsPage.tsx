import { FC } from 'react';
import style from './ProblemsPage.module.css';
import FooterBack from '../../components/FooterBack/FooterBack';

const ProblemsPage: FC = () => {
  return (
    <>
    <section className={style.problemsPage}>
      <div className={style.problemsPageContainer}>
      <button className={style.btn}>Нет товара</button>
      <button className={style.btn}>Товар бракованный</button>
      <button className={style.btn}>Другая проблема</button>
      </div>
    </section>
    <FooterBack />
    </>
  )
}

export default ProblemsPage;
