import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import style from './AuthorizationForm.module.css';
import { IAuthorizationForm } from '../../../utils/type/main';
import ButtonLink from '../ButtonLink/ButtonLink';
import ButtonForm from '../ButtonForm/ButtonForm';
import { useHistory } from 'react-router-dom';
import { userId } from '../../../utils/constants';
import { registerPrinterApi, registerTableApi } from '../../../utils/api';
import { getCookie, setCookie } from '../../../utils/cookie';

const AuthorizationForm: FC<IAuthorizationForm> = ({label, btnBack, btnForward, linkBack, linkForward}) => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  console.log(inputValue);
  console.log(history.location.pathname);

  const changeValueIndex = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value.replace(/\D/,''));
  }

  const Auth = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (history.location.pathname === '/table') {
      try {
        await registerTableApi({userId, inputValue})
          .then((data: any) => {
            setCookie('token', data.token.split('Bearer ')[1]);
            console.log(getCookie("token"));
            history.replace({ pathname: '/printer' });
            setIsLoading(false);
            setErrorMsg('');
            setInputValue('');
          })
      } catch(error) {
        setErrorMsg('Упс! Что-то пошло не так')
        console.log(error)
      }
    } else if (history.location.pathname === '/printer') {
      try {
        await registerPrinterApi({inputValue})
          .then((data: any) => {
            console.log(data);
          })
      } catch(error) {
        setErrorMsg('Упс! Что-то пошло не так')
        console.log(error)
      }
    }
  }


  return (
    <form className={style.form} onSubmit={Auth}>
      <label className={style.label}>{label}</label>
      <input
        className={style.input}
        type="text"
        pattern="[0-9]*"
        placeholder=''
        value={inputValue}
        onChange={changeValueIndex}
        required
      />
      {isLoading ? (
        <p className={style.load}>Ждем...</p>
        ) : (
          ''
      )}
      {errorMsg !== '' ? (
        <p className={style.err}>{errorMsg}</p>
      ) : (
        ''
      )}
      <div className={style.btns}>
        <ButtonLink purpose={'authBack'} title={btnBack} link={linkBack} />
        <ButtonForm text={btnForward} />
      </div>
    </form>
  )
}

export default AuthorizationForm;
