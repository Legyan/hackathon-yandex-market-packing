import { ChangeEvent, FC, SyntheticEvent, useState, useCallback } from 'react';
import style from './Form.module.css';
import { IForm } from '../../utils/type/main';
import ButtonLink from '../ui/ButtonLink/ButtonLink';
import ButtonForm from '../ui/ButtonForm/ButtonForm';
import { useHistory, useLocation } from 'react-router-dom';
import { userId } from '../../utils/constants';
import { useDispatch, useSelector } from '../../utils/type/store';
import { registerPrinter, registerTable } from '../../services/actions/userActions';
import { getCookie, setCookie } from '../../utils/cookie';
import { postBarcode, postHonestSign, postImei } from '../../services/actions/barcodeAction';

const Form: FC<IForm> = ({label, btnBack, btnForward, linkBack, linkForward}) => {
  const history = useHistory();
  const location = useLocation();
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const dispatch = useDispatch();
  const confirmation = useSelector(store => store.barcodeInfo)

  const changeValueIndex = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  }

  const onSubmit = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (location.pathname === '/table') {
      dispatch(
        registerTable({userId, inputValue})
      );
      history.replace({ pathname: linkForward });
    } else if (location.pathname === '/printer') {
      dispatch(
        registerPrinter({inputValue})
      );
      history.replace({ pathname: linkForward });
    } else if (location.pathname === '/order') {
      setCookie('barcode', inputValue);
      let barcode = getCookie('barcode');
      dispatch(
        postBarcode({inputValue})
      )
      if (confirmation.statusImei = 'ok') {
        postImei({barcode, inputValue})
      } else if (confirmation.statusHonest = 'ok') {
        postHonestSign({barcode, inputValue})
      }
    }
  setIsLoading(false);
  setErrorMsg('');
  setInputValue('');
  }, [dispatch, history, inputValue, linkForward])


  return (
    <form className={style.form} onSubmit={onSubmit}>
      <label className={style.label}>{label}</label>
      <input
        className={style.input}
        type="text"
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
        {
          location.pathname === '/order' ?
            <ButtonForm purpose={'authForward'} title={btnForward} />
          :
            <>
              <ButtonLink purpose={'authBack'} title={btnBack} link={linkBack} />
              <ButtonForm purpose={'authForward'} title={btnForward} />
            </>
        }
      </div>
    </form>
  )
}

export default Form;
