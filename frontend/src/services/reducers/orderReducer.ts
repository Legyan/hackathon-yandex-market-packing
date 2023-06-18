import { IAlreadyPacked, IGoods, IRecPacking } from "../../utils/type/data";
import {
  GET_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS
} from "../actions/orderActions";

const initialState = {
  success: false,
  isLoading: false,
  error: '',
  data: null,
  // {
  //   orderkey: '',
  //   partition: '',
  //   goods: [
  //     {                        Дописать count  в типизации
  //       sku: '',
  //       title: '',
  //       description: '',
  //       image: '',
  //       imei: false,
  //       honest_sign: false, // честный знак
  //       fragility: true, // подсказка пупырка
  //     }
  //   ],
  //   recomend_packing: [
  //     {
  //       cartontype: '',
  //       icontype: '',
  //       items: [{
  //         sku: '',
  //         count: 0
  //       }]
  //     }
  //   ],
  //   already_packed: [
  //     [{
  //       cartontype: '',
  //       is_packed: false,
  //       items: [{
  //         sku: '',
  //         count: 0
  //       }]
  //     }]
  //   ]
  // }
}

interface IState {
  success: boolean;
  isLoading: boolean;
  error?: string | boolean;
  data:{
    orderkey: string;
    partition: string;
    goods: Array<IGoods>;
    recomend_packing: Array<Array<IRecPacking>>;
    already_packed: Array<IAlreadyPacked>;
  } | null;
}

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS
  data: {
    orderkey: string;
    partition: string;
    goods: Array<IGoods>;
    recomend_packing: Array<Array<IRecPacking>>;
    already_packed: Array<IAlreadyPacked>;
  }
}

export interface IGetOrderError {
  readonly type: typeof GET_ORDER_ERROR;
  error?: string;
}

export type TActionsOrder =
  IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderError

export const orderReducer = (state: IState = initialState, action: TActionsOrder): IState => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        success: true,
        isLoading: true,
      }
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      }
    case GET_ORDER_ERROR:
      return {
        ...state,
        success: false,
        error: action.error,
      }
    default:
      return state;
  }
}