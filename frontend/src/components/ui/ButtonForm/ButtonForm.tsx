import React, { FC } from 'react';
import style from './ButtonForm.module.css';
import { IButton } from '../../../utils/type/main';

const ButtonForm: FC<IButton> = ({
  purpose,
  title,
  onClick,
  ...rest
}) => {
  return (
    <>
      <button className={
        purpose === 'authForward' ? `${style.btn} ${style.btnProportionsAuth} ${style.btnForward}` :
        purpose === 'package' ? `${style.btn} ${style.btnProportionsMain} ${style.btnPackage}` :
        purpose === 'logout' ? `${style.btn} ${style.btnProportionsMain} ${style.btnLogout}` :
        purpose === 'problem' ? `${style.btn} ${style.btnProportionsMain} ${style.btnProblem}` :
        purpose === 'cancelOrder' ? `${style.btn} ${style.btnProportionsMain} ${style.btnCancelOrder}` :
        purpose === 'authBack' ? `${style.btn} ${style.btnProportionsAuth} ${style.btnBack}` :
        ''
        }
        onClick={onClick}
      >
        {title}
      </button>
    </>
  )
}

export default ButtonForm;
