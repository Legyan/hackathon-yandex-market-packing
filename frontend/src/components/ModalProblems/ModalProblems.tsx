import ModalWindow from '../ModalWindow/ModalWindow';
import ButtonModal from '../ButtonModal/ButtonModal';
import { useHistory } from 'react-router-dom';

const ModalProblems = ({...props}) => {
  const history = useHistory();

  const switchPageDeffectiveGoods = () => {
    history.push('/ScanDeffectiveGoods');
  }

  const switchPageAnotherProblems = () => {
    history.push('/problems/another');
  }

  return (
    <ModalWindow
    visible={props.visible}
    onClose={props.onClose}
    onClick={props.onClick}
    >
      <ButtonModal  title='Нет товара' />
      <ButtonModal  onClick={switchPageDeffectiveGoods} title='Товар бракованный' />
      <ButtonModal  onClick={switchPageAnotherProblems} title='Другая проблема' />
    </ModalWindow>
  )
}

export default ModalProblems;