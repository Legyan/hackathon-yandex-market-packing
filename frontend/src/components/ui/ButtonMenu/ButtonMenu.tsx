import { FC } from 'react';
import { v4 as uuid4 } from 'uuid';
import style from './ButtonMenu.module.css';
import { IButtonMenu } from '../../../utils/type/main';
import iconBox from '../../../images/icon_box.svg';
import packet from '../../../images/icon_package.svg';
import stretch from '../../../images/icon_stretch.svg';
import nonpack from '../../../images/icon_nonpack.svg';
import { useDispatch } from '../../../utils/type/store';
import { selectRecommendation } from '../../../services/actions/recommendationAction';

const ButtonMenu: FC<IButtonMenu> = ({
  data,
  index,
  recomendnIndex,
  ...rest
}) => {
  const dispatch = useDispatch();

  const choiceRecommendation = () => {
    dispatch(selectRecommendation(data, index))
    console.log(data)
  }

  return (
    <button
      className={
        recomendnIndex === index ? `${style.wrapper} ${style.active}` : `${style.wrapper} ${style.notSelection}`
      }
      onClick={choiceRecommendation}
    >{data.map(btn => {
      return(
        <div
          className={
            data.length > 1 ? `${style.package} ${style.packageBig}` : `${style.package}`
          }
          key={uuid4()}
        >
          {
            btn.icontype === 'box' ?
              <img className={data.length === 3 ? `${style.imgSmall}` : `${style.img}`}
              src={iconBox} alt='Иконка коробки' /> :
            btn.icontype === 'packet' ?
              <img className={data.length === 3 ? `${style.imgSmall}` : `${style.img}`}
              src={packet} alt='Иконка пакета' /> :
            btn.icontype === 'STRETCH' ?
              <img className={data.length === 3 ? `${style.imgSmall}` : `${style.img}`}
              src={stretch} alt='Иконка стретч-плёнки' /> :
            btn.icontype === 'NONPACK' ?
            <img className={data.length === 3 ? `${style.imgSmall}` : `${style.img}`}
            src={nonpack} alt='Иконка нон-пака' /> :
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
