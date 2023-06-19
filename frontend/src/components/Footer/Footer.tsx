import { FC } from 'react';
import style from './Footer.module.css';
import keyboard from '../../images/icon_keyboard.svg';
import { useHistory, useLocation } from 'react-router-dom';
import { IFooter } from '../../utils/type/main';

const Footer: FC<IFooter> = ({title, onClick}) => {
  const history = useHistory();
  const location = useLocation()

  const goBack = () => {
    history.goBack()
  }

  return (
    <footer className={
      location.pathname === '/order' || location.pathname === '/deffectiveGoods' ?
        `${style.footer}` : `${style.footer} ${style.footerBack}`}
    >
      {
        location.pathname === '/order' || location.pathname === '/deffectiveGoods' ?
          <button className={style.btnFooter} onClick={onClick}>
            <img src={keyboard} alt='Иконка клавиатуры' />
            <span className={style.description}>Ввести с клавиатуры</span>
          </button>
          :
          location.pathname === '/problems' || location.pathname === '/problems/another' ?
            <button className={style.btnFooterBack} onClick={goBack}>
              <span className={style.wrappText}>{title}</span>
            </button>
            :
            location.pathname === '/order' || location.pathname === '/deffectiveGoods/waitConfirmation' ?
              <button className={style.btnFooter} onClick={onClick}>
                <img src={keyboard} alt='Иконка клавиатуры' />
                <span className={style.description}>Ввести с клавиатуры</span>
              </button>
              :
              location.pathname === '/order' || location.pathname === '/missinGoods' ?
                <button className={style.btnFooterBack} onClick={goBack}>
                  <span className={style.wrappText}>{title}</span>
                </button>
                :
                ''
      }
    </footer>
  )
}

export default Footer;
