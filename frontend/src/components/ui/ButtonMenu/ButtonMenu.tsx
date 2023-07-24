import { FC, useCallback, useEffect } from 'react';
import { v4 as uuid4 } from 'uuid';
import style from './ButtonMenu.module.css';
import { IButtonMenu } from '../../../utils/type/main';
import iconBox from '../../../images/icon_box.svg';
import packet from '../../../images/icon_package.svg';
import stretch from '../../../images/icon_stretch.svg';
import nonpack from '../../../images/icon_nonpack.svg';
import { useDispatch, useSelector } from '../../../utils/type/store';
import { selectRecommendation } from '../../../services/actions/recommendationAction';

const ButtonMenu: FC<IButtonMenu> = ({
  data,
  index,
  recomendnIndex,
  active,
  choice,
  ...rest
}) => {
  const dispatch = useDispatch();
  const alreadyPacked = useSelector(store => store.orderInfo.data?.already_packed);

  const choiceRecommendation = () => {
    dispatch(selectRecommendation(data, index))
  }

  // const choicePackRecomendation = () => {
  //   if (alreadyPacked !== null && alreadyPacked !== undefined) {

  //   }
  // }

  // console.log(data);
  // console.log(active);
  // console.log(alreadyPacked && alreadyPacked[0].cartontype);
  // console.log(choice);
  // console.log(choice && recomendnIndex === index);
  // console.log(alreadyPacked);

  // if (alreadyPacked !== null && alreadyPacked !== undefined) {

  //   dispatch(selectRecommendation(alreadyPacked, index))
  // }


  // useEffect(() => {
  //   choiceRecommendation()
  // }, [active])


  // useEffect(() => {
  //   if (alreadyPacked && alreadyPacked[0].cartontype === data[0].cartontype) {
  //     dispatch(selectRecommendation(data, index))
  //   }
  // }, [alreadyPacked, data, dispatch, index])

  return (
    <button
      className={
        choice && recomendnIndex === index ? `${style.wrapper} ${style.active}` :
        choice ? `${style.wrapper} ${style.active}` :
        !active ? `${style.wrapper} ${style.inactive}` :
        `${style.wrapper} ${style.notSelection}`
      }
      onClick={choiceRecommendation}
      disabled={!active}
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
