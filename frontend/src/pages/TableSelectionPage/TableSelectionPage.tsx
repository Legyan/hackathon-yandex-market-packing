import { FC } from 'react';
import style from './TableSelectionPage.module.css';
import Progressbar from '../../components/Progressbar/Progressbar';
import Form from '../../components/Form/Form';
import Footer from '../../components/Footer/Footer';

const TableSelectionPage: FC = () => {
  return (
    <>
      <section className={style.wrapper}>
        <Progressbar />
        <Form
          label={'Отсканируйте штрихкод стола или введите вручную'}
          btnBack={'Назад'}
          btnForward={'Далее'}
          linkBack={'/table'}
          linkForward={'/printer'}
        />
      </section>
      <Footer />
    </>
  )
}

export default TableSelectionPage;
