import { ChangeEvent, FC, SyntheticEvent, useState, useCallback } from 'react';
import style from './AuthorizationForm.module.css';
import { IAuthorizationForm } from '../../../utils/type/main';
import ButtonLink from '../ButtonLink/ButtonLink';
import ButtonForm from '../ButtonForm/ButtonForm';
import { useHistory } from 'react-router-dom';
import { userId } from '../../../utils/constants';
import { useDispatch } from '../../../utils/type/redux';
import { registerPrinter, registerTable } from '../../../services/actions/userActions';
import { getCookie } from '../../../utils/cookie';

const AuthorizationForm: FC<IAuthorizationForm> = ({label, btnBack, btnForward, linkBack, linkForward}) => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const dispatch = useDispatch();

  console.log(inputValue);
  console.log(history.location.pathname);

  const changeValueIndex = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value.replace(/\D/,''));
  }

  const Auth = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (history.location.pathname === '/table') {
      dispatch(
        registerTable({userId, inputValue})
      );
      console.log(getCookie("token"));
      history.replace({ pathname: linkForward });
      setIsLoading(false);
      setErrorMsg('');
      setInputValue('');
    } else if (history.location.pathname === '/printer') {
      dispatch(
        registerPrinter({inputValue})
      );
      history.replace({ pathname: linkForward });
      setIsLoading(false);
      setErrorMsg('');
      setInputValue('');
    }
  }, [dispatch, history, inputValue, linkForward])


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
        <ButtonForm purpose={'authForward'} text={btnForward} />
      </div>
    </form>
  )
}

export default AuthorizationForm;
