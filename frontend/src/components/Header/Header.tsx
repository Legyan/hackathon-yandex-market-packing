import { FC } from 'react';
import style from './Header.module.css';
import burger from '../../images/burger_menu.svg';
import logoYandex from '../../images/logo_yandex.svg';
import logoYandexMarket from '../../images/logo_yandex-market.svg';
import rocket from '../../images/icon_rocket.svg'

const Header: FC = () => {
  return (
    <header className={style.header}>
      <button className={style.btnBurger}>
        <img src={burger} alt="Кнопка бургер меню" />
      </button>
      <div className={style.logos}>
        <img src={logoYandex} alt="Логотип Яндекс" />
        <img src={logoYandexMarket} alt="Логотип Яндекс" />
      </div>
      <h1 className={style.title}>Склад</h1>
      <div className={style.statistics}>
        <span className={style.nickname}>sof-natgemokee</span>
        <button className={style.btnKpi}>KPI</button>
        <button className={style.btnStat}>
          <img src={rocket} alt="Рокета" />
          <span className={style.statUser}>97%</span>
        </button>
      </div>
    </header>
  )
}

export default Header;
