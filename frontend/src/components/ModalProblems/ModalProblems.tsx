import ModalWindow from '../ModalWindow/ModalWindow';
import ButtonModal from '../ButtonModal/ButtonModal';


const ModalProblems = ({...props}) => {

  return (
    <ModalWindow
    visible={props.visible}
    onClose={props.onClose}
    // onClick={props.onClick}
    >
      <ButtonModal  title='Нет товара' />
      <ButtonModal  title='Товар бракованный' />
      <ButtonModal  title='Другая проблема' />
    </ModalWindow>
  )
}

export default ModalProblems;