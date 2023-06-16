import {
  ButtonHTMLAttributes,
  PropsWithChildren
} from "react";

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

export interface IGoods {
  img: string;
  title: string;
  clue?: string;
  percentage: string;
  sku: string;
  sign?: string;
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
}
