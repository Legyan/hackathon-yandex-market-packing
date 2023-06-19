import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import style from './ModalHonest.module.css';
import ModalWindow from '../ModalWindow/ModalWindow';
import { IModal } from '../../utils/type/main';
import { getCookie } from '../../utils/cookie';
import honestSign from '../../images/honest_sign.png';
import { postHonestSignApi } from '../../utils/api';

const ModalHonest: FC<IModal> = ({visible, onClose, onClick}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const changeValueIndex = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let barcode = getCookie('barcode');
    try {
      await postHonestSignApi({barcode, inputValue})
        .then(res => {
          if (res && res.success) {
            console.log(res);
            onClose();
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
            value={inputValue}
            onChange={changeValueIndex}
            required
          />
        </form>
      </section>
    </ModalWindow>
  )
}

export default ModalHonest;
