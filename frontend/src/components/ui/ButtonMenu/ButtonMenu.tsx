import { FC } from 'react';
import style from './ButtonMenu.module.css';
import { IButtonMenu } from '../../../utils/type/main';

const ButtonMenu: FC<IButtonMenu> = ({ icon, description, count, activeButton, ...rest }) => {


  return (
    <button
      className={
        activeButton === 'active' ? `${style.wrapper} ${style.active}` :
        activeButton === 'notSelection' ? `${style.wrapper} ${style.notSelection}` :
        activeButton === 'inactive' ? `${style.wrapper} ${style.inactive}` :
        ''
      }
    >
      <div className={style.package}>
        <img className={style.img} src={icon} alt='Иконка коробки' />
        <p className={style.description}>{description}</p>
      </div>
      {count ? (
        <div className={
          activeButton === 'active' || activeButton === 'notSelection' ? `${style.countWrapper}` :
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
