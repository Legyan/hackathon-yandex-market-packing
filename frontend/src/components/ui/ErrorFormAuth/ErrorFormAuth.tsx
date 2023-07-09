import { FC } from "react";
import style from './ErrorFormAuth.module.css';
import { IErrorFormAuth } from "../../../utils/type/main";

const ErrorFormAuth: FC<IErrorFormAuth> = ({location}) => {
  const {isDirty, isEmpty, isError} = location;

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
        <span className={style.err}>Не верно введён штрихкод.</span>
      : ''
      }
    </div>
  )
}

export default ErrorFormAuth;
