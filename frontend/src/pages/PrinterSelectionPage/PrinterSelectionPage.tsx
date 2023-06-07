import { FC } from 'react';
import style from './PrinterSelectionPage.module.css'
import Footer from '../../components/Footer/Footer';
import Progressbar from '../../components/Progressbar/Progressbar';
import AuthorizationForm from '../../components/ui/AuthorizationForm/AuthorizationForm';

const PrinterSelectionPage: FC = () => {
  return (
    <>
      <section className={style.wrapper}>
        <Progressbar />
        <AuthorizationForm
          label={'Отсканируйте штрихкод принтера или введите вручную'}
          btnBack={'Назад'}
          btnForward={'Далее'}
        />
      </section>
      <Footer />
    </>
  )
}

export default PrinterSelectionPage;
