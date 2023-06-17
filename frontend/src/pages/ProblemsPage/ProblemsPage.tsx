import { FC } from 'react';
import style from './ProblemsPage.module.css';
import ButtonProblem from '../../components/ButtonProblems/ButtonProblems';
import Footer from '../../components/Footer/Footer';

const ProblemsPage: FC = () => {
  return (
    <>
    <section className={style.problemsPage}>
      <div className={style.problemsPageContainer}>
      <ButtonProblem link='/' title='Нет товара'/>
      <ButtonProblem link='/defective' title='Товар бракованный'/>
      <ButtonProblem link='/problems/another' title='Другая проблема'/>
      </div>
    </section>
    <Footer title='Назад'/>
    </>
  )
}

export default ProblemsPage;
