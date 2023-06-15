import {
  ButtonHTMLAttributes
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

export interface IGoodsProps {
  img: string;
  title: string;
  clue?: string;
  percentage: string;
  sku: string;
  sign?: string;
}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
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

export interface IUser {
  user_id: string;
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
