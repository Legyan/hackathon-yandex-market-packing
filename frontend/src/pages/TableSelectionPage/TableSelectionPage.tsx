import { FC } from 'react';
import style from './TableSelectionPage.module.css';
import Progressbar from '../../components/Progressbar/Progressbar';
import AuthorizationForm from '../../components/ui/AuthorizationForm/AuthorizationForm';
import Footer from '../../components/Footer/Footer';
import { getCookie } from '../../utils/cookie';

const TableSelectionPage: FC = () => {
  console.log(getCookie("token"));

  return (
    <>
      <section className={style.wrapper}>
        <Progressbar />
        <AuthorizationForm
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
