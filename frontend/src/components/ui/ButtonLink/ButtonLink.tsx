import { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './ButtonLink.module.css';
import { IButtonLink } from '../../../utils/type/main';


const ButtonLink: FC<IButtonLink> = ({ purpose, title, link }) => {
  return (
    <>
      <Link
        className={
          purpose === 'order' ? `${style.btn} ${style.btnProportionsOrder} ${style.btnOrder}` :
          purpose === 'anotherProblem' ? `${style.btn} ${style.btnProportionsOrder} ${style.btnProblem}` :
          purpose === 'package' ? `${style.btn} ${style.btnProportionsMain} ${style.btnPackage}` :
          purpose === 'problem' ? `${style.btn} ${style.btnProportionsMain} ${style.btnProblem}` :
          purpose === 'logout' ? `${style.btn} ${style.btnProportionsMain} ${style.btnLogout}` :
          ''
        }
        to={link}>
          {title}
      </Link>
    </>
  )
}

export default ButtonLink;
