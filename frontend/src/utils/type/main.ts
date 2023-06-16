import {
  ButtonHTMLAttributes,
  PropsWithChildren,
  HTMLProps,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface IAuthorizationForm {
  label: string;
  btnBack: string;
  btnForward: string;
  linkBack: string;
  linkForward: string;
}

export interface IProgressbar {
  title?: string;
}

export interface IHint {
  icon: string;
  title: string;
}

export interface IGoodsProps {
  img: string;
  title: string;
  clue?: string;
  percentage: string;
  sku: string;
  sign?: string;
}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  purpose: string;
  title: string;
  onClick?: () => void;
}

export interface IButtonMenu extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  description: string;
  count?: string;
  activeButton: string;
}

export interface IButtonLink extends ButtonHTMLAttributes<HTMLButtonElement> {
  purpose: string;
  title: string;
  link: string;
}

export interface IModalOverlay {
  visible: boolean;
  closeModal: () => void;
}
export interface IModalWindow extends PropsWithChildren {
  visible: boolean;
  onClose: () => void;
  onClick?: () => void;
}
export interface IUser {
  user_name: string;
  user_id: number;
  table_id: string;
  printer_id: string;
}

export interface IGoods {
  sku: string;
  title: string;
  description: string;
  image: string;
  imei: boolean;
  honest_sign: boolean;
  fragility: boolean;
}

export interface IItems {
  sku: string;
  count: number;
}

export interface IRecPacking {
  cartontype: string;
  items: Array<IItems>;
}

export interface IProtectedRoute {
  children: string | JSX.Element | JSX.Element[];
  rest?: HTMLProps<RouteComponentProps>;
  path?: string;
  exact?: boolean;
}
