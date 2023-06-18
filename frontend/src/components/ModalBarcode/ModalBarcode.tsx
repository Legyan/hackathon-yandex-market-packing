import { ChangeEvent, FC, SyntheticEvent, useCallback, useState } from 'react';
import style from './ModalBarcode.module.css'
import ModalWindow from '../ModalWindow/ModalWindow';
import { IModal } from '../../utils/type/main';
import ButtonForm from '../ui/ButtonForm/ButtonForm';
import { useDispatch } from '../../utils/type/store';
import { setCookie } from '../../utils/cookie';
import { postBarcode } from '../../services/actions/barcodeAction';

const ModalBarcode: FC<IModal> = ({visible, onClose, onClick}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useDispatch();

  const changeValueIndex = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
      setCookie('barcode', inputValue);
      dispatch(
        postBarcode({inputValue})
      )
      onClose();

  setInputValue('');
  }

  return (
    <ModalWindow
      visible={visible}
      onClose={onClose}
      onClick={onClick}
    >
      <form className={style.form} onSubmit={onSubmit}>
        <label className={style.label}>Введите штрих код вручную</label>
        <input
          className={style.input}
          type="text"
          placeholder=''
          value={inputValue}
          onChange={changeValueIndex}
          required
        />
        <div className={style.btns}>
          <ButtonForm purpose={'authForward'} title={'Подтвердить'} />
        </div>
      </form>
    </ModalWindow>
  )
}

export default ModalBarcode;
