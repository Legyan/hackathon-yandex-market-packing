import { FC } from 'react';
import { v4 as uuid4 } from 'uuid';
import style from './ButtonMenu.module.css';
import { IButtonMenu } from '../../../utils/type/main';
import iconBox from '../../../images/icon_box.svg';
import packet from '../../../images/icon_package.svg';
import stretch from '../../../images/icon_stretch.svg';
import nonpack from '../../../images/icon_nonpack.svg';

const ButtonMenu: FC<IButtonMenu> = ({ data, activeButton, ...rest }) => {
  console.log(data.length);

  return (
    <button
      className={
        activeButton === 'active' ? `${style.wrapper} ${style.active}` :
        activeButton === 'notSelection' ? `${style.wrapper} ${style.notSelection}` :
        activeButton === 'inactive' ? `${style.wrapper} ${style.inactive}` :
        ''
      }
    >{data.map(btn => {
      return(
        <div
          className={
            data.length > 1 ? `${style.package} ${style.packageBig}` : `${style.package}`
          }
          key={uuid4()}
        >
          {
            btn.icontype === 'box' ? <img className={style.img} src={iconBox} alt='Иконка коробки' /> :
            btn.icontype === 'packet' ? <img className={style.img} src={packet} alt='Иконка пакета' /> :
            btn.icontype === 'STRETCH' ? <img className={style.img} src={stretch} alt='Иконка стретч-плёнки' /> :
            btn.icontype === 'NONPACK' ? <img className={style.img} src={nonpack} alt='Иконка нон-пака' /> :
            ''
          }
          <p className={style.description}>{btn.cartontype}</p>
        </div>
      )
    })}
    </button>
  )
}

export default ButtonMenu;
