import { FC } from 'react';
import style from './AnotherProblemsPage.module.css';
import FooterBack from '../../components/FooterBack/FooterBack';
import ButtonProblem from '../../components/ButtonProblems/ButtonProblems';

const AnotherProblemsPage: FC = () => {
  return (
    <>
    <section className={style.problemsPage}>
    <div className={style.problemsPageContainer}>
      <ButtonProblem link='/' title='Сломан монитор' />
      <ButtonProblem link='/' title='Сломан сканер' />
      <ButtonProblem link='/' title='Сломан принтер' />
      <ButtonProblem link='/'  title='Позвать бригадира' />
      </div>
      </section>
      <FooterBack link='/problems' title='Назад'/>
    </>
  )
}

export default AnotherProblemsPage;