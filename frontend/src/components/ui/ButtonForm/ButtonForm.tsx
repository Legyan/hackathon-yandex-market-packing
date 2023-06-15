import React, { FC } from 'react';
import style from './ButtonForm.module.css';
import { IButton } from '../../../utils/type/main';

const ButtonForm: FC<IButton> = ({ text }) => {
  return (
    <>
      <button className={`${style.btn} ${style.btnProportionsAuth} ${style.btnForward}`}>{text}</button>
    </>
  )
}

export default ButtonForm;
