import { IGoods, IRecPacking, IUser } from "./main";

export interface IRegisterTable {
  userId: number;
  inputValue: string;
}

export interface IResponseTable {
  success: boolean;
  token: string;
}

export interface IRegisterPrinter {
  inputValue: string;
}

export interface IResponsePrinter {
  success: boolean;
  user: IUser;
}

export interface IDataValues<T> {
  success: boolean;
  data: T;
}

export interface IOrder {
  partition: string;
  orderkey: string;
  goods: Array<IGoods>
  recomend_packing: Array<IRecPacking>
}