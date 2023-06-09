import {
  ButtonHTMLAttributes,
  HTMLProps,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IRecPacking } from './data';

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
  onClick?: () => void;
}

export interface IButtonMenu extends ButtonHTMLAttributes<HTMLButtonElement> {
  data: Array<IRecPacking>;
  index: number;
  recomendnIndex: number;
  active?: boolean;
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
export interface IFooter {
  title?: string;
  onClick?: () => void;
}
