import { FC, PropsWithChildren } from 'react';
import style from './BtnHasProblem.module.css';

interface BtnHasProblemProps extends PropsWithChildren {
  title: string;
  onClick: () => void;
}

const BtnHasProblem: FC<BtnHasProblemProps> = ({...props}) => {

  return(
    <>
    <button type='button' className={style.btn} onClick={props.onClick}>{props.title}</button>
    </>
  )
}

export default BtnHasProblem;