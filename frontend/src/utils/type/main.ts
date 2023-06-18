import {
  ButtonHTMLAttributes,
  Dispatch,
  HTMLProps,
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
}

export interface IModal {
  visible: boolean;
  children?: string | JSX.Element | JSX.Element[];
  onClose: () => void;
  onClick?: () => void;
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

export interface IFooter {
  title?: string;
  onClick?: () => void;
}
