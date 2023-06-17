import { FC } from 'react';
import AuthorizationForm from '../../components/ui/AuthorizationForm/AuthorizationForm';
import Footer from '../../components/Footer/Footer';
import style from './PageScanDeffectiveGoods.module.css'

const PageScanDeffectiveGoods: FC = () => {
  return(
    <>
      <section className={style.wrapper}>
        <AuthorizationForm
          label={'Отсканируйте бракованный товар или введите вручную'}
          btnBack={'Назад'}
          btnForward={'Далее'}
          linkBack={'order'}
          linkForward={'/deffectiveGoods/waitConfirmation'}
        />
      </section>
      <Footer />
    </>
  )
}

export default PageScanDeffectiveGoods;