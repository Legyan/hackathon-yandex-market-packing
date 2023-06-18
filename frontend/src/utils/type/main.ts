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
  clue: boolean;
  percentage: string;
  sku: string;
  imei: boolean;
  honest_sign: boolean;
  sign?: string;
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
  // firstRecommen: Array<IRecPacking>
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
  username: string;
  user_id: number;
  table_id: string;
  printer_id: string;
}

export interface IGoods {
  count?: number;
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

export interface IPackage {
  icon: string;
  title: string;
}

export interface IRecPacking {
  cartontype: string;
  icontype: string;
  items: Array<IItems>;
}

export interface IAlreadyPacked {
  cartontype: string;
  is_packed: boolean;
  items: Array<IItems>;
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

export interface IFooter {
  title?: string;
}