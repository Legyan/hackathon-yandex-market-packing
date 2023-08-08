import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import style from './ModalNoOrders.module.css';
import ModalWindow from '../ModalWindow/ModalWindow';
import { IModal } from '../../utils/type/main';
import ButtonForm from '../ui/ButtonForm/ButtonForm';
import ErrorForm from '../ui/ErrorForm/ErrorForm';
import { postOrderApi } from '../../utils/api';

const ModalNoOrders: FC<IModal> = ({visible, onClose}) => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  const backMainPage = () => {
    history.replace({ pathname: '/' });
  }

  const postOrder = async () => {
    setLoading(true);
    try {
      const res = await postOrderApi()
      if (res.status === 'ok') {
        console.log(res);
        onClose()
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage('Заказ все еще не сформирован')
      console.log(error)
    }
  }

  return (
    <ModalWindow
      visible={visible}
      onClose={onClose}
    >
      <article className={style.wrapper}>
        <h2 className={style.title}>Заказов на упаковку нет. Попробовать еще раз?</h2>
        {/* <ErrorForm dataError={errorMessage} loading={isLoading} /> */}
        <div className={style.btns}>
          <ButtonForm
            purpose={'authBack'}
            title={'Подожду немного'}
            onClick={backMainPage}
          />
          <ButtonForm
            purpose={'authForward'}
            title={'Мне повезёт!'}
            onClick={postOrder}
          />
        </div>
      </article>
    </ModalWindow>
  )
}

export default ModalNoOrders;
