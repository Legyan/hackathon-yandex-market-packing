import { FC } from 'react';
import style from './AuthorizationForm.module.css';
import { IAuthorizationForm } from '../../../utils/type/main';
import { Link } from 'react-router-dom';
import ButtonLink from '../ButtonLink/ButtonLink';

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
        <ButtonLink purpose={'authBack'} title={btnBack} link={linkBack} />
        <ButtonLink purpose={'authForward'} title={btnForward} link={linkForward} />
      </div>
    </form>
  )
}

export default AuthorizationForm;
