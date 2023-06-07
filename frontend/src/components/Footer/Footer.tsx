import { FC } from 'react';
import style from './Footer.module.css';
import keyboard from '../../images/icon_keyboard.svg';

const Footer: FC = () => {
  return (
    <footer className={style.footer}>
      <button className={style.btnFooter}>
        <img src={keyboard} alt='Иконка клавиатуры' />
        <span className={style.description}>Ввести с клавиатуры</span>
      </button>
    </footer>
  )
}

export default Footer;
