import ModalWindow from '../ModalWindow/ModalWindow';
import AuthorizationForm from '../ui/AuthorizationForm/AuthorizationForm';

const ModalCodeConfirm = ({...props}) => {

  return (
    <ModalWindow
    visible={props.visible}
    onClose={props.onClose}
    onClick={props.onClick}
    >
<AuthorizationForm
          label={'Введите код для подтверждения операции'}
          btnBack={'Назад'}
          btnForward={'Подтвердить'}
          linkBack={'/deffectiveGoods'}
          linkForward={'/deffectiveGoods/waitConfirmation'}
        />
    </ModalWindow>
  )
}

export default ModalCodeConfirm;