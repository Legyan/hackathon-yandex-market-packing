import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import style from './AnotherProblemsPage.module.css';
import ButtonModal from '../../components/ButtonModal/ButtonModal';
import ToastSendReq from '../../components/ToastSendReq/ToastSendReq';
import Footer from '../../components/Footer/Footer';

const AnotherProblemsPage: FC = () => {
  const [isModalSendReq, setModalSendReq] = useState(false);
  const history = useHistory();


  const openModalSendReq = () => {
    setModalSendReq(true);
  }

  const closeModalSendReq = () => {
    setModalSendReq(false);
  }


  const switchPage = () => {
    history.push('/');
  }

  return (
    <>
    <section className={style.problemsPage}>
    <div className={style.problemsPageContainer}>
      <ButtonModal onClick={openModalSendReq} isOpen={isModalSendReq} title='Сломан монитор' />
      <ButtonModal onClick={openModalSendReq} isOpen={isModalSendReq} title='Сломан сканер' />
      <ButtonModal onClick={openModalSendReq} isOpen={isModalSendReq} title='Сломан принтер' />
      <ButtonModal onClick={openModalSendReq} isOpen={isModalSendReq} title='Позвать бригадира' />
      </div>
      </section>
      <Footer title='Назад'/>
      <ToastSendReq isOpen={isModalSendReq} onClose={closeModalSendReq} onClick={switchPage}/>
    </>
  )
}

export default AnotherProblemsPage;