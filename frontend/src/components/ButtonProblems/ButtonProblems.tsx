import { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './ButtonProblems.module.css';
import { ButtonProblemProps } from '../../utils/type/main';

const ButtonProblem: FC<ButtonProblemProps> = ({ link, title }) => {
  return (
    <Link className={style.btn} to={link}>
      {title}
    </Link>
  )
}

export default ButtonProblem;
