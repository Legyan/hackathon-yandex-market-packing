import { FC } from 'react';
import Form from '../../components/Form/Form';
import Footer from '../../components/Footer/Footer';
import style from './PageScanDeffectiveGoods.module.css'

const PageScanDeffectiveGoods: FC = () => {
  return(
    <>
      <section className={style.wrapper}>
        <Form
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