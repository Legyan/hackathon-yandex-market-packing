import { FC } from 'react';
import style from './ButtonMenu.module.css';
import { IButtonMenu } from '../../../utils/type/main';

const ButtonMenu: FC<IButtonMenu> = ({ icon, description, count, activeButton }) => {


  return (
    <button className={
      activeButton === 'active' ? `${style.wrapper}` :
      activeButton === 'inactive' ? `${style.wrapper} ${style.inactive}` :
      `${style.wrapper} ${style.invisible}`
    }>
      <div className={style.package}>
        <img className={style.img} src={icon} alt='Иконка коробки' />
        <p className={style.description}>{description}</p>
      </div>
      {count ? (
        <div className={
          activeButton === 'active' || activeButton === 'inactive' ? `${style.countWrapper}` :
          `${style.countWrapper} ${style.invisibleCount}`
        }>
          <span className={style.count}>{count}</span>
        </div>
      ) : (
        ''
      )}
    </button>
  )
}

export default ButtonMenu;
