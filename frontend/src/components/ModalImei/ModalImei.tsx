import { FC, SyntheticEvent, useState } from 'react';
import style from './ModalImei.module.css';
import ModalWindow from '../ModalWindow/ModalWindow';
import { IModal } from '../../utils/type/main';
import { getCookie } from '../../utils/cookie';
import imei from '../../images/barcode.svg';
import { postImeiApi } from '../../utils/api';
import ErrorForm from '../ui/ErrorForm/ErrorForm';
import useInput from '../../utils/hooks/useInput';

const ModalImei: FC<IModal> = ({visible, onClose, onClick}) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const inputImei = useInput('', {isEmpty: true, minLength: 15});

  let inputValue = inputImei.value;

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    let barcode = getCookie('barcode');
    try {
      const res = await postImeiApi({ barcode, inputValue })
      if (res && res.success) {
        onClose();
        inputImei.setValue('');
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage('Введён неверный MEI товара, отсканирйуте другой')
      console.log(error)
    }
  }

  return (
    <ModalWindow
      visible={visible}
      onClose={onClose}
      onClick={onClick}
      setValue={inputImei.setValue}
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
            value={inputImei.value}
            onChange={inputImei.onChange}
            onBlur={inputImei.onBlur}
            required
          />
          <ErrorForm location={inputImei} dataError={errorMessage} loading={isLoading} />
        </form>
      </section>
    </ModalWindow>
  )
}

export default ModalImei;
