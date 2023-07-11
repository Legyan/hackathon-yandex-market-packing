import { FC } from 'react';
import { v4 as uuid4 } from 'uuid';
import style from './PackagingOptions.module.css';
import ButtonMenu from '../ui/ButtonMenu/ButtonMenu';
import { useSelector } from '../../utils/type/store';
import { IPackagingOptions } from '../../utils/type/main';

const PackagingOptions: FC<IPackagingOptions> = ({order}) => {
  const recommendationInfo = useSelector(store => store.recommendationInfo);
  const alreadyPacked = useSelector(store => store.orderInfo.data?.already_packed);
  const choiceCartontype = alreadyPacked !== undefined ? alreadyPacked.map(pack => pack.cartontype) : null;

  // console.log(recomend.find(rec => choiceCartontype !== null && choiceCartontype[0]?.includes(rec.cartontype)) !== undefined)
  console.log(choiceCartontype !== null && choiceCartontype[0]);
  console.log(alreadyPacked);



  return (
    <ul className={style.btns}>
      {order.recomend_packing.map((recomend, index) => {
        console.log(recomend.find(rec => choiceCartontype !== null && choiceCartontype[0]?.includes(rec.cartontype)) !== undefined)
        console.log(recomend)
        return (
          <li className={style.li} key={uuid4()}>
            <ButtonMenu
              data={recomend}
              index={index}
              recomendnIndex={recommendationInfo.index}
              active={recomend.find(rec => choiceCartontype !== null && choiceCartontype[0]?.includes(rec.cartontype)) !== undefined}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default PackagingOptions;
