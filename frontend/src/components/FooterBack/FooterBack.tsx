import { FC } from 'react';
import style from './FooterBack.module.css';

const FooterBack: FC = () => {
  return (
    <footer className={style.footerBack}>
      <button className={style.btnFooterBack}><span className={style.wrappText}>Назад</span></button>
    </footer>
  )
}

export default FooterBack;
