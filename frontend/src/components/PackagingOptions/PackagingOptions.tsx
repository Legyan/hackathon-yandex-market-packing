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
  // console.log(alreadyPacked);
  // console.log(recommendationInfo);

  return (
    <ul className={style.btns}>
      {alreadyPacked && order.recomend_packing.map((recomend, index) => {
        return (
          <li className={style.li} key={uuid4()}>
            <ButtonMenu
              data={recomend}
              index={index}
              recomendnIndex={recommendationInfo.index}
              active={recomend.find(rec => choiceCartontype !== null && choiceCartontype[0]?.includes(rec.cartontype)) !== undefined || choiceCartontype === null}
              choice={alreadyPacked[0].cartontype === recomend[0].cartontype}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default PackagingOptions;
