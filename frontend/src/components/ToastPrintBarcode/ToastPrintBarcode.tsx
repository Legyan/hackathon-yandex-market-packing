import Toast from '../Toast/Toast';
import iconBarcodeForToast from '../../images/icon_BarcodeForToast.svg'

const ToastPrintBarcode = ({...props}) => {

  return (
    <Toast
    text={'Распечатайте штрихкод упаковки'}
    nameBtnCancel={'Отмена'}
    nameBtnСontinue={'Печатать'}
    img={iconBarcodeForToast}
    imgAlt={'иконка коробки'}
    isOpen={props.isOpen}
    onClose={props.onClose}
    onClick={props.onClick}
    />
  )
}

export default ToastPrintBarcode;