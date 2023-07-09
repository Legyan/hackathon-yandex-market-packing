export interface IRegisterTable {
  userId: number;
  valueTable: string;
}

export interface IResponseTable {
  success: boolean;
  token: string;
}

export interface IRegisterPrinter {
  valuePrinter: string;
}

export interface IResponsePrinter {
  success: boolean;
  user: IUser;
}

export interface IDataValues<T> {
  success?: boolean;
  status?: string;
  data: T;
}

export interface IOrder {
  partition: string;
  orderkey: string;
  goods: Array<IGoods>
  recomend_packing: Array<Array<IRecPacking>>
  already_packed: Array<IAlreadyPacked>;
}

export interface IBarcode {
  inputValue: string;
}

export interface IResponseBarcode {
  status: string;
  type: string;
  info: string;
  imei: boolean;
  honest_sign: boolean;
}

export interface IImei {
  barcode?: string;
  inputValue: string;
}

export interface IHonestSign {
  barcode?: string;
  inputValue: string;
}

export interface IStatus {
  status: string;
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

