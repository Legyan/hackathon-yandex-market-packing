import { FC, useState } from 'react';
import style from './OrderPage.module.css';
import ModalProblems from '../../components/ModalProblems/ModalProblems'
import { useHistory } from 'react-router-dom';

// Кнопка Есть проблема тестовая, добавленая для отработки сценария

const OrderPage: FC = () => {

  const history = useHistory();
  const [isModalProblems, setModalProblems] = useState(false);

  const openModal = () => {
    setModalProblems(true);
}

// const closeModal = () => {
//     setModalProblems(false);
// }

const switchPage = () => {
  history.push('/');
}

  return (
    <>
      <h1>Товары ячейки B-09</h1>
      <h2>Варианты упаковки</h2>
      <button type='button' className={style.btnHaveProblem} onClick={openModal}>Есть проблема</button>
      <ModalProblems isOpen={isModalProblems} onClick={switchPage}/>
    </>
  )
}

export default OrderPage;
