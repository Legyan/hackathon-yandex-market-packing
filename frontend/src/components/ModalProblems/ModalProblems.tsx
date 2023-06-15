import { FC, PropsWithChildren } from 'react';
import style from './ModalProblems.module.css';
import ButtonModal from '../ButtonModal/ButtonModal';

interface ModalProblemsProps extends PropsWithChildren {
  isOpen?: boolean;
  // onClose: () => void;
  onClick: () => void;
}

const ModalProblems: FC<ModalProblemsProps> = ( props: ModalProblemsProps) => {

  return (
    <>
    {props.isOpen &&
    <section className={`${style.modal} ${style.modalOpened}`}>
      <div className={style.container}>
      <ButtonModal onClick={props.onClick} title='Нет товара' />
      <ButtonModal onClick={props.onClick} title='Товар бракованный' />
      <ButtonModal onClick={props.onClick} title='Другая проблема' />
      </div>
    </section>
}
    </>
  )
}

export default ModalProblems;
