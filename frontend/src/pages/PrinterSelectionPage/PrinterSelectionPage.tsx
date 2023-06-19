import { FC } from 'react';
import style from './PrinterSelectionPage.module.css'
import Footer from '../../components/Footer/Footer';
import Progressbar from '../../components/Progressbar/Progressbar';
import Form from '../../components/Form/Form';

const PrinterSelectionPage: FC = () => {
  return (
    <>
      <section className={style.wrapper}>
        <Progressbar />
        <Form
          label={'Отсканируйте штрихкод принтера или введите вручную'}
          btnBack={'Назад'}
          btnForward={'Далее'}
          linkBack={'/table'}
          linkForward={'/'}
        />
      </section>
      <Footer />
    </>
  )
}

export default PrinterSelectionPage;
