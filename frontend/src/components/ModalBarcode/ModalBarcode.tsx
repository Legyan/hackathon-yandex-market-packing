import { FC, SyntheticEvent, useState } from 'react';
import useInput from '../../utils/hooks/useInput';
import style from './ModalBarcode.module.css'
import ModalWindow from '../ModalWindow/ModalWindow';
import { IModalBarcode } from '../../utils/type/main';
import ButtonForm from '../ui/ButtonForm/ButtonForm';
import { setCookie } from '../../utils/cookie';
import { postBarcodeApi } from '../../utils/api';
import ErrorForm from '../ui/ErrorForm/ErrorForm';

const ModalBarcode: FC<IModalBarcode> = ({
  visible,
  onClose,
  onClick,
  statusImei,
  stausHonest,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const inputBarcode = useInput('', {isEmpty: true, minLength: 3});
  let inputValue = inputBarcode.value;

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setCookie('barcode', inputBarcode.value);
    try {
      const res = await postBarcodeApi({ inputValue });
      if (res && res.data.imei) {
        statusImei(true);
      } else if (res && res.data.honest_sign) {
        stausHonest(true);
      }
      onClose();
      inputBarcode.setValue('');
    } catch(error) {
      setErrorMessage('Введён не корректный штрих-код');
      console.log(error);
    }
  }

  return (
    <ModalWindow
      visible={visible}
      onClose={onClose}
      onClick={onClick}
      setValue={inputBarcode.setValue}
    >
      <form className={style.form} onSubmit={onSubmit}>
        <label className={style.label}>Введите штрих код вручную</label>
        <input
          className={style.input}
          type="text"
          placeholder=''
          value={inputBarcode.value}
          onChange={inputBarcode.onChange}
          onBlur={inputBarcode.onBlur}
          required
        />
        <ErrorForm location={inputBarcode} dataError={errorMessage} />
        <div className={style.btns}>
          <ButtonForm
            type='submit'
            purpose={'authForward'}
            title={'Подтвердить'}
            inputValid={!inputBarcode.inputValid}
          />
        </div>
      </form>
    </ModalWindow>
  )
}

export default ModalBarcode;
