import { FC } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import ButtonModal from '../ButtonModal/ButtonModal';
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

  return (
    <ModalWindow
      visible={visible}
      onClose={onClose}
      onClick={onClick}
    >
      <ButtonModal  title='Нет товара' />
      <ButtonModal  onClick={switchPageDeffectiveGoods} title='Товар бракованный' />
      <ButtonModal  onClick={switchPageAnotherProblems} title='Другая проблема' />
    </ModalWindow>
  )
}

export default ModalProblems;
