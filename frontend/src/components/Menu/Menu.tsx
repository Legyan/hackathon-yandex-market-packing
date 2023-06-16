import { FC } from 'react';
import ButtonMenu from '../ui/ButtonMenu/ButtonMenu';
import { IMenu, IRecPacking } from '../../utils/type/main';

const Menu: FC<IMenu> = ({ recommend }) => {
  const [btn1, btn2, btn3]: Array<Array<IRecPacking>> = recommend;

  return (
    <>
      <ButtonMenu
        data={btn1}
        activeButton={'active'}
      />
      <ButtonMenu
        data={btn2}
        activeButton={'notSelection'}
      />
      <ButtonMenu
        data={btn3}
        activeButton={'inactive'}
        disabled
      />
    </>
  )
}

export default Menu;