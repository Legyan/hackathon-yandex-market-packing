import { FC } from 'react';
import style from './Statistics.module.css';
import box from '../../images/icon_stat_box.svg';
import speed from '../../images/icon_speedstat.svg';
import cup from '../../images/icon_cup.svg';

const Statistics: FC = () => {
  return (
    <ul className={style.statistics}>
      <li className={style.stat}>
        <h3 className={style.statTitle}>Упаковано за сегодня</h3>
        <img src={box} className={style.img} alt='Иконка коробки' />
        <p className={style.description}>Количество упакованного товара</p>
        <span className={style.counter}>12</span>
      </li>
      <li className={style.stat}>
        <h3 className={style.statTitle}>Скорость работы</h3>
        <img src={speed} className={style.img} alt='Иконка спидометр' />
        <p className={style.description}>Количество упаковок в день</p>
        <span className={style.counter}>156</span>
      </li>
      <li className={style.stat}>
        <h3 className={style.statTitle}>Сверхзадачи</h3>
        <img src={cup} className={style.img} alt='Иконка кубка' />
        <p className={style.description}>Упаковки товара сверхнормы</p>
        <span className={style.counter}>11</span>
      </li>
    </ul>
  )
}

export default Statistics;
