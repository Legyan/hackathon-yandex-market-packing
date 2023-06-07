import { FC } from 'react';
import style from './FooterBack.module.css';

const FooterBack: FC = () => {
  return (
    <footer className={style.footerBack}>
      <button className={style.btnFooterBack}>Назад</button>
    </footer>
  )
}

export default FooterBack;
