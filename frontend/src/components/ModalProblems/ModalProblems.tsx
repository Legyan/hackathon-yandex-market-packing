import ModalWindow from '../ModalWindow/ModalWindow';
import ButtonModal from '../ButtonModal/ButtonModal';
import { useHistory } from 'react-router-dom';

const ModalProblems = ({...props}) => {
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
    visible={props.visible}
    onClose={props.onClose}
    onClick={props.onClick}
    >
      <ButtonModal  onClick={switchPageMissinGoods} title='Нет товара' />
      <ButtonModal  onClick={switchPageDeffectiveGoods} title='Товар бракованный' />
      <ButtonModal  onClick={switchPageAnotherProblems} title='Другая проблема' />
    </ModalWindow>
  )
}

export default ModalProblems;