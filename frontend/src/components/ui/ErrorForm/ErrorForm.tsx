import { FC } from "react";
import style from './ErrorForm.module.css';
import { IErrorForm } from "../../../utils/type/main";

const ErrorForm: FC<IErrorForm> = ({location, dataError, loading}) => {
  const {isDirty, isEmpty, isError, minLength, minLengthError} = location!;

  return(
    <div className={style.errWrapper}>
      {isDirty && isEmpty
      ?
        <span className={style.err}>Поле не может быть пустым.</span>
      :
        ''
      }
      {isDirty && isError
      ?
        <span className={style.err}>Для регистрации стола введите: PACK-1. Принтера: 001.</span>
      : ''
      }
      {isDirty && minLengthError
      ?
        <span className={style.err}>{`Корректная длина поля: ${minLength}`}</span>
      : ''
      }
      {dataError
      ?
        <span className={style.err}>{dataError}</span>
      : ''
      }
      {loading && !dataError
      ?
        <span className={style.loading}>Пожалуйста, подождите. Проверяем</span>
      : ''
      }
    </div>
  )
}

export default ErrorForm;
