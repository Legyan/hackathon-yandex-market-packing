import { FC } from 'react';
import style from './PrinterSelectionPage.module.css'
import Footer from '../../components/Footer/Footer';
import Progressbar from '../../components/Progressbar/Progressbar';

const PrinterSelectionPage: FC = () => {
  return (
    <>
      <section className={style.wrapper}>
        <Progressbar />
        <form className={style.form}>
          <label className={style.label}>Отсканируйте штрихкод принтера или введите вручную</label>
          <input
            className={style.input}
            type='text'
            placeholder=''
            required
          />
          <div className={style.btns}>
            <button className={style.btnBack}>Назад</button>
            <button className={style.btnForward}>Далее</button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  )
}

export default PrinterSelectionPage;
