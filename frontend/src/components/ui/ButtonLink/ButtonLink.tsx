import { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './ButtonLink.module.css';
import { IButtonLink } from '../../../utils/type/main';

const ButtonLink: FC<IButtonLink> = ({ purpose, title, link }) => {
  return (
    <>
      <Link
        className={
          purpose === 'authBack' ? `${style.btn} ${style.btnProportionsAuth} ${style.btnBack}` :
          purpose === 'order' ? `${style.btn} ${style.btnProportionsOrder} ${style.btnOrder}` :
          purpose === 'anotherProblem' ? `${style.btn} ${style.btnProportionsOrder} ${style.btnProblem}` :
          ''
        }
        to={link}>
          {title}
      </Link>
    </>
  )
}

export default ButtonLink;
