import React, { FC } from 'react';
import style from './ButtonForm.module.css';
import { IButton } from '../../../utils/type/main';

const ButtonForm: FC<IButton> = ({ purpose, text }) => {
  return (
    <>
      <button className={
        purpose === 'authForward' ? `${style.btn} ${style.btnProportionsAuth} ${style.btnForward}` :
        purpose === 'package' ? `${style.btn} ${style.btnProportionsMain} ${style.btnPackage}` :
        ''
        }>
          {text}
      </button>
    </>
  )
}

export default ButtonForm;
