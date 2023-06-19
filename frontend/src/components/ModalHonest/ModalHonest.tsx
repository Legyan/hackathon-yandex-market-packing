import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import style from './ModalHonest.module.css';
import ModalWindow from '../ModalWindow/ModalWindow';
import { IModal } from '../../utils/type/main';
import { getCookie } from '../../utils/cookie';
import { postHonestSign } from '../../services/actions/barcodeAction';
import honestSign from '../../images/honest_sign.png';
import { useDispatch } from '../../utils/type/store';

const ModalHonest: FC<IModal> = ({visible, onClose, onClick}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useDispatch();

  const changeValueIndex = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    let barcode = getCookie('barcode');
    dispatch(postHonestSign({barcode, inputValue}));
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