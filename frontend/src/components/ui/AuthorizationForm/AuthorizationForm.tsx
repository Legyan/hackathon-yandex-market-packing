import { FC } from 'react';
import style from './AuthorizationForm.module.css';
import { IAuthorizationForm } from '../../../utils/type/main';
import { Link } from 'react-router-dom';

const AuthorizationForm: FC<IAuthorizationForm> = ({label, btnBack, btnForward, linkBack, linkForward}) => {
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
        <Link className={style.btnBack} to={linkBack}>{btnBack}</Link>
        <Link className={style.btnForward} to={linkForward}>{btnForward}</Link>
      </div>
    </form>
  )
}

export default AuthorizationForm;
