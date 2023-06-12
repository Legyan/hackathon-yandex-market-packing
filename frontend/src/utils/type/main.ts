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
