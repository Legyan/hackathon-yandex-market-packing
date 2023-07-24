import {
  ButtonHTMLAttributes,
  ChangeEvent,
  HTMLProps,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IAlreadyPacked, IGoods, IRecPacking } from './data';

/**
 * UI components types
*/

export interface IHint {
  icon: string;
  title: string;
  visible: boolean;
}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  purpose: string;
  title: string;
  disable?: boolean;
  onClick?: () => void;
}

export interface IButtonMenu extends ButtonHTMLAttributes<HTMLButtonElement> {
  data: Array<IRecPacking>;
  index: number;
  recomendnIndex: number;
  active?: boolean;
  choice: boolean;
}

export interface IButtonLink extends ButtonHTMLAttributes<HTMLButtonElement> {
  purpose: string;
  title: string;
  link: string;
}

export interface ButtonModalProps extends PropsWithChildren {
  title: string;
  onClick?: () => void;
  isOpen?: boolean;
}

export interface ButtonProblemProps extends PropsWithChildren {
  link: string;
  title: string;
}

export interface ToastProps extends PropsWithChildren {
  text?: string;
  nameBtnCancel?: string;
  nameBtnСontinue?: string;
  img?: string;
  imgAlt?: string;
  isOpen?: boolean;
  loading?: boolean;
  err?: string;
  onClose: () => void;
  onClick: () => void;
}

/**
 * Components types
*/

export interface IForm {
  label: string;
  btnBack: string;
  btnForward: string;
  linkBack: string;
  linkForward: string;
}

export interface IProgressbar {
  title?: string;
}

export interface IPackage {
  icon: string;
  cartontype: string;
  visible: boolean;
}

export interface IGoodsProps {
  img: string;
  title: string;
  clue: boolean;
  percentage: string;
  sku: string;
  imei: boolean;
  honest_sign: boolean;
  sign?: string;
  defective_goods: boolean;
  onClick?: () => void;
}

export interface IModal {
  visible: boolean;
  children?: string | JSX.Element | JSX.Element[];
  onClose: () => void;
  onClick?: () => void;
  setValue?: Dispatch<SetStateAction<string>>;
  setError?: Dispatch<SetStateAction<string>>;
}

export interface IModalBarcode {
  visible: boolean;
  children?: string | JSX.Element | JSX.Element[];
  onClose: () => void;
  onClick?: () => void;
  statusImei: Dispatch<SetStateAction<boolean>>;
  stausHonest: Dispatch<SetStateAction<boolean>>;
}

export interface IModalOverlay {
  visible: boolean;
  closeModal: () => void;
}

export interface IProtectedRoute {
  children: string | JSX.Element | JSX.Element[];
  rest?: HTMLProps<RouteComponentProps>;
  path?: string;
  exact?: boolean;
}

export interface IMenu {
  recommend: Array<Array<IRecPacking>>;
}

export interface IPageWaitConfirmation {
  title?: string;
}

export interface IFooter {
  title?: string;
  onClick?: () => void;
}

export interface IValidationForm {
  isEmpty: boolean;
  table?: string;
  printer?: string;
  minLength: number;
}

export interface IErrorForm {
  location?: {
    isEmpty: boolean;
    isError: boolean;
    inputValid: boolean;
    value: string;
    isDirty: boolean;
    minLength: number;
    minLengthError?: boolean;
    setValue: Dispatch<SetStateAction<string>>;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  }
  dataError?: string;
  loading?: boolean;
}

export interface IOrder {
  goods: IRecPacking;
  order: {
    orderkey: string;
    partition: string;
    goods: IGoods[];
    recomend_packing: IRecPacking[][];
    already_packed: IAlreadyPacked[];
  }
}

export interface IPackagingOptions {
  order: {
    orderkey: string;
    partition: string;
    goods: IGoods[];
    recomend_packing: IRecPacking[][];
    already_packed: IAlreadyPacked[];
  }
}