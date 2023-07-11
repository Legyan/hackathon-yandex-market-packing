import { FC, SyntheticEvent, useState } from 'react';
import style from './ModalHonest.module.css';
import ModalWindow from '../ModalWindow/ModalWindow';
import { IModal } from '../../utils/type/main';
import { getCookie } from '../../utils/cookie';
import honestSign from '../../images/honest_sign.png';
import { postHonestSignApi } from '../../utils/api';
import useInput from '../../utils/hooks/useInput';
import ErrorForm from '../ui/ErrorForm/ErrorForm';

const ModalHonest: FC<IModal> = ({visible, onClose, onClick}) => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const inputHonest = useInput('', {isEmpty: true, minLength: 13});
  let inputValue = inputHonest.value;

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let barcode = getCookie('barcode');
    try {
      const res = await postHonestSignApi({ barcode, inputValue })
      if (res && res.success) {
        onClose();
        inputHonest.setValue('');
      }
    } catch (error) {
      setErrorMessage('Введён неверный штрихкод упаковки, отсканирйуте другой');
      console.log(error)
    }
  }

  return (
    <ModalWindow
      visible={visible}
      onClose={onClose}
      onClick={onClick}
      setValue={inputHonest.setValue}
    >
      <section className={style.wrapper}>
        <div className={style.imgWrapper}>
          <img className={style.img} src={honestSign} alt='Логотип Честный знак' />
        </div>
        <form className={style.form} onSubmit={onSubmit}>
          <label className={style.label}>Отсканируйте маркировку Честный знак или введите вручную</label>
          <input
            className={style.input}
            type="text"
            placeholder=''
            value={inputHonest.value}
            onChange={inputHonest.onChange}
            onBlur={inputHonest.onBlur}
            required
          />
          <ErrorForm location={inputHonest} dataError={errorMessage} />
        </form>
      </section>
    </ModalWindow>
  )
}

export default ModalHonest;
