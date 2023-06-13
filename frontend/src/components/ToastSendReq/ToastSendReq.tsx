import Toast from '../Toast/Toast';
import iconBox from '../../images/icon_iconBox.svg'

const ToastSendReq = ({...props}) => {

  return (
    <Toast
    text={'Ваш запрос отправлен. Ожидайте подтверждение бригадира. Нажмите «Продолжить» для получения нового заказа'}
    nameBtnCancel={'Отмена'}
    nameBtnСontinue={'Продолжить'}
    img={iconBox}
    imgAlt={'иконка коробки'}
    isOpen={props.isOpen}
    onClose={props.onClose}
    onClick={props.onClick}
    />
  )
}

export default ToastSendReq;