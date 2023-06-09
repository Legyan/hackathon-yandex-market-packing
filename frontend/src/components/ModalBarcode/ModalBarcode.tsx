import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import style from './ModalBarcode.module.css'
import ModalWindow from '../ModalWindow/ModalWindow';
import { IModalBarcode } from '../../utils/type/main';
import ButtonForm from '../ui/ButtonForm/ButtonForm';
import { setCookie } from '../../utils/cookie';
import { postBarcodeApi } from '../../utils/api';

const ModalBarcode: FC<IModalBarcode> = ({
  visible,
  onClose,
  onClick,
  statusImei,
  stausHonest,
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const changeValueIndex = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setCookie('barcode', inputValue);
    try {
      await postBarcodeApi({ inputValue })
        .then(res => {
          if (res && res.data.imei) {
            statusImei(true);
          } else if (res && res.data.honest_sign) {
            stausHonest(true);
          }
        })
    } catch (error) {
      console.log(error)
    }
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
