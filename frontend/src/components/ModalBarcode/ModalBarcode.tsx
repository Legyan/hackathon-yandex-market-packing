import { FC } from 'react';
import Form from '../Form/Form';
import ModalWindow from '../ModalWindow/ModalWindow';
import { IModal } from '../../utils/type/main';

const ModalBarcode: FC<IModal> = ({visible, onClose, onClick}) => {
  return (
    <ModalWindow
      visible={visible}
      onClose={onClose}
      onClick={onClick}
    >
      <Form
        label={'Введите штрих код товара вручную'}
        btnBack={'Назад'}
        btnForward={'Далее'}
        linkBack={'/table'}
        linkForward={'/'}
      />
    </ModalWindow>
  )
}

export default ModalBarcode;
