import { FC } from 'react';
import style from './Header.module.css';

const Header: FC = () => {
  return (
    <>
      <h1 className={style.title}>Я шапка. Я пришла</h1>
    </>
  )
}

export default Header;
