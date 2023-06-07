import { FC } from 'react';
import style from './AuthorizationForm.module.css';
import { IAuthorizationForm } from '../../../utils/type/main';

const AuthorizationForm: FC<IAuthorizationForm> = ({label, btnBack, btnForward}) => {
  return (
    <form className={style.form}>
      <label className={style.label}>{label}</label>
      <input
        className={style.input}
        type='text'
        placeholder=''
        required
      />
      <div className={style.btns}>
        <button className={style.btnBack}>{btnBack}</button>
        <button className={style.btnForward}>{btnForward}</button>
      </div>
    </form>
  )
}

export default AuthorizationForm;
