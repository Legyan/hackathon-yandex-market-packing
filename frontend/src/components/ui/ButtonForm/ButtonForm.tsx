import React, { FC } from 'react';
import style from './ButtonForm.module.css';
import { IButton } from '../../../utils/type/main';

const ButtonForm: FC<IButton> = ({
  purpose,
  title,
  onClick,
  inputValid,
  ...rest
}) => {
  console.log(inputValid);

  return (
    <>
      <button className={
        purpose === 'authForward' ? `${style.btn} ${style.btnProportionsAuth} ${style.btnForward}` :
        purpose === 'package' ? `${style.btn} ${style.btnProportionsMain} ${style.btnPackage}` :
        purpose === 'logout' ? `${style.btn} ${style.btnProportionsMain} ${style.btnLogout}` :
        purpose === 'problem' ? `${style.btn} ${style.btnProportionsMain} ${style.btnProblem}` :
        purpose === 'cancelOrder' ? `${style.btn} ${style.btnProportionsMain} ${style.btnCancelOrder}` :
        purpose === 'authBack' ? `${style.btn} ${style.btnProportionsAuth} ${style.btnBack}` :
        purpose === 'order' ? `${style.btn} ${style.btnProportionsOrder} ${style.btnOrder}` :
        ''
        }
        type='submit'
        onClick={onClick}
        disabled={inputValid}
      >
        {title}
      </button>
    </>
  )
}

export default ButtonForm;
