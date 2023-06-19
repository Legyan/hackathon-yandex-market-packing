import { FC } from 'react';
import Toast from '../Toast/Toast';
import iconBox from '../../images/icon_iconBox.svg'

import { ToastProps } from '../../utils/type/main';

const ToastSendReq: FC<ToastProps> = ({
  isOpen,
  onClose,
  onClick,
}) => {

  return (
    <Toast
    text={'Ваш запрос отправлен. Ожидайте подтверждение бригадира. Нажмите «Продолжить» для получения нового заказа'}
    nameBtnCancel={'Отмена'}
    nameBtnСontinue={'Продолжить'}
    img={iconBox}
    imgAlt={'иконка коробки'}
    isOpen={isOpen}
    onClose={onClose}
    onClick={onClick}
    />
  )
}

export default ToastSendReq;