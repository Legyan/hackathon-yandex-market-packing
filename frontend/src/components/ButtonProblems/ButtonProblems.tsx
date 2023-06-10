import { FC, PropsWithChildren } from 'react';
import style from './ButtonProblems.module.css';
import { Link } from 'react-router-dom';

interface ButtonProblemProps extends PropsWithChildren {
  link: string;
  title: string;
}

const ButtonProblem: FC<ButtonProblemProps> = ({ link, title }) => {
  return (
    <Link className={style.btn} to={link}>{title}</Link>
  )
}

export default ButtonProblem;