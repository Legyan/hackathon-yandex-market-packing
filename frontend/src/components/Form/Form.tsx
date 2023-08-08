import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from '../../utils/type/store';
import useInput from '../../utils/hooks/useInput';
import style from './Form.module.css';
import { IForm } from '../../utils/type/main';
import ButtonLink from '../ui/ButtonLink/ButtonLink';
import ButtonForm from '../ui/ButtonForm/ButtonForm';
import { userId } from '../../utils/constants';
import { registerPrinter, registerTable } from '../../services/actions/userActions';
import ErrorForm from '../ui/ErrorForm/ErrorForm';

const Form: FC<IForm> = ({label, btnBack, btnForward, linkBack, linkForward}) => {
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setLoading] = useState<boolean>(false);
  const inputTable = useInput('', {isEmpty: true, table: 'PACK-1', minLength: 3});
  const inputPrinter = useInput('', {isEmpty: true, printer: '001', minLength: 3});
  const dispatch = useDispatch();

  let valueTable = inputTable.value;
  let valuePrinter = inputPrinter.value;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    location.pathname === '/table' ? inputTable.onChange(e) : inputPrinter.onChange(e)
  }

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    location.pathname === '/table' ? inputTable.onBlur(e) : inputPrinter.onBlur(e)
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    if (location.pathname === '/table') {
      dispatch(
        registerTable({userId, valueTable})
      );
      history.replace({ pathname: linkForward });
      inputTable.setValue('');
      setLoading(false);
    } else if (location.pathname === '/printer') {
      dispatch(
        registerPrinter({valuePrinter})
      );
      history.replace({ pathname: linkForward });
      inputPrinter.setValue('');
      setLoading(false);
    }
  }

  return (
    <form className={style.form} onSubmit={onSubmit}>
      <label className={style.label}>{label}</label>
      <input
        className={style.input}
        type="text"
        placeholder=''
        value={inputTable.value || inputPrinter.value}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
      {location.pathname === '/table'
      ?
        <ErrorForm location={inputTable} loading={isLoading} />
      :
        <ErrorForm location={inputPrinter} loading={isLoading} />
      }
      <div className={style.btns}>
        {
          location.pathname === '/order' ?
            <ButtonForm purpose={'authForward'} title={btnForward} />
          :
            <>
              <ButtonLink purpose={'authBack'} title={btnBack} link={linkBack} />
              {location.pathname === '/table'
              ?
                <ButtonForm
                  purpose={'authForward'}
                  title={btnForward}
                  disable={!inputTable.inputValid}
                />
              :
                <ButtonForm
                  purpose={'authForward'}
                  title={btnForward}
                  disable={!inputPrinter.inputValid}
                />
              }
            </>
        }
      </div>
    </form>
  )
}

export default Form;
