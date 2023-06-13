import { FC, PropsWithChildren } from 'react';
import style from './FooterBack.module.css';
import { Link } from 'react-router-dom';

interface FooterProps extends PropsWithChildren {
  link: string;
  title: string;
}

const FooterBack: FC<FooterProps> = ({ link, title }) => {
  return (
    <footer className={style.footerBack}>
      <Link className={style.btnFooterBack} to={link}><span className={style.wrappText}>{title}</span></Link>
    </footer>
  )
}

export default FooterBack;