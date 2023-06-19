import { FC } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import ButtonModal from '../ui/ButtonModal/ButtonModal';
import { useHistory } from 'react-router-dom';
import { IModal } from '../../utils/type/main';

const ModalProblems: FC<IModal> = ({visible, onClose, onClick}) => {
  const history = useHistory();

  const switchPageDeffectiveGoods = () => {
    history.push('/deffectiveGoods');
  }

  const switchPageAnotherProblems = () => {
    history.push('/problems/another');
  }

  const switchPageMissinGoods = () => {
    history.push('/missinGoods');
  }

  return (
    <ModalWindow
      visible={visible}
      onClose={onClose}
      onClick={onClick}
    >
      <ButtonModal  onClick={switchPageMissinGoods} title='Нет товара' />
      <ButtonModal  onClick={switchPageDeffectiveGoods} title='Товар бракованный' />
      <ButtonModal  onClick={switchPageAnotherProblems} title='Другая проблема' />
    </ModalWindow>
  )
}

export default ModalProblems;
