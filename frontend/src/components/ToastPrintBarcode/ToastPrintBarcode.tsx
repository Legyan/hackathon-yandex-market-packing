import { FC } from 'react';
import Toast from '../Toast/Toast';
import iconBarcodeForToast from '../../images/icon_BarcodeForToast.svg'
import { ToastProps } from '../../utils/type/main';

const ToastPrintBarcode: FC<ToastProps> = ({
  isOpen,
  onClose,
  onClick,
  loading,
  err,
}) => {

  return (
    <Toast
    text={'Распечатайте штрихкод упаковки'}
    nameBtnCancel={'Отмена'}
    nameBtnСontinue={'Печатать'}
    img={iconBarcodeForToast}
    imgAlt={'иконка коробки'}
    isOpen={isOpen}
    onClose={onClose}
    onClick={onClick}
    loading={loading}
    err={err}
    />
  )
}

export default ToastPrintBarcode;