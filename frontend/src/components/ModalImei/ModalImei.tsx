import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import style from './ModalImei.module.css';
import ModalWindow from '../ModalWindow/ModalWindow';
import { IModal } from '../../utils/type/main';
import { getCookie } from '../../utils/cookie';
import { postImei } from '../../services/actions/barcodeAction';
import imei from '../../images/barcode.svg';
import { useDispatch } from '../../utils/type/store';

const ModalImei: FC<IModal> = ({visible, onClose, onClick}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useDispatch();

  const changeValueIndex = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    let barcode = getCookie('barcode');
    dispatch(
      postImei({barcode, inputValue})
    );
    onClose();
    setInputValue('');
  }

  return (
    <ModalWindow
      visible={visible}
      onClose={onClose}
      onClick={onClick}
    >
      <section className={style.wrapper}>
        <div className={style.imgWrapper}>
          <img className={style.img} src={imei} alt='Логотип Честный знак' />
        </div>
        <form className={style.form} onSubmit={onSubmit}>
          <label className={style.label}>Отсканируйте IMEI товара или введите вручную</label>
          <input
            className={style.input}
            type="text"
            placeholder=''
            value={inputValue}
            onChange={changeValueIndex}
            required
          />
        </form>
      </section>
    </ModalWindow>
  )
}

export default ModalImei;
