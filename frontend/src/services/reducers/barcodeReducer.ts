import {
  POST_BARCODE_REQUEST,
  POST_BARCODE_SUCCESS,
  POST_BARCODE_ERROR,
  POST_IMEI_REQUEST,
  POST_IMEI_SUCCESS,
  POST_IMEI_ERROR,
  POST_HONEST_SIGN_REQUEST,
  POST_HONEST_SIGN_SUCCESS,
  POST_HONEST_SIGN_ERROR,
} from "../actions/barcodeAction";

const initialState = {
  success: false,
  error: '',
  statusImei: '',
  statusHonest: '',
  data: {
    status: '',
    type: '',
    info: '',
    imei: false,
    honest_sign: false,
  }
}

interface IState {
  success: boolean;
  error?: string | boolean;
  statusImei?: string;
  statusHonest?: string;
  data: {
    status: string;
    type: string;
    info: string;
    imei: boolean;
    honest_sign: boolean;
  }
}

export interface IPostBarcodeRequest {
  readonly type: typeof POST_BARCODE_REQUEST;
}

export interface IPostBarcodeSuccess {
  readonly type: typeof POST_BARCODE_SUCCESS;
  data: {
    status: string;
    type: string;
    info: string;
    imei: boolean;
    honest_sign: boolean;
  }
}

export interface IPostBarcodeError {
  readonly type: typeof POST_BARCODE_ERROR;
  error?: string;
}

export interface IPostImeiRequest {
  readonly type: typeof POST_IMEI_REQUEST
}

export interface IPostImeiSuccess {
  readonly type: typeof POST_IMEI_SUCCESS;
  status?:  string;
}

export interface IPostImeiError {
  readonly type: typeof POST_IMEI_ERROR;
  error?: string;
}

export interface IPostIHonestRequest {
  readonly type: typeof POST_HONEST_SIGN_REQUEST;
}

export interface IPostHonestSuccess {
  readonly type: typeof POST_HONEST_SIGN_SUCCESS;
  status?:  string;
}

export interface IPostHonestError {
  readonly type: typeof POST_HONEST_SIGN_ERROR;
  error?: string;
}

export type TActionsBarcode =
  IPostBarcodeRequest
  | IPostBarcodeSuccess
  | IPostBarcodeError
  | IPostImeiRequest
  | IPostImeiSuccess
  | IPostImeiError
  | IPostIHonestRequest
  | IPostHonestSuccess
  | IPostHonestError

export const barcodeReducer = (state: IState = initialState, action: TActionsBarcode): IState => {
  switch (action.type) {
    case POST_BARCODE_REQUEST:
      return {
        ...state,
        success: true,
      }
    case POST_BARCODE_SUCCESS:
      return {
        ...state,
        data: action.data,
        success: false,
      }
    case POST_BARCODE_ERROR:
      return {
        ...state,
        success: false,
        error: action.error,
      }

      case POST_IMEI_REQUEST:
        return {
          ...state,
          success: true,
        }
      case POST_IMEI_SUCCESS:
        return {
          ...state,
          statusImei: action.status,
          success: false,
        }
      case POST_IMEI_ERROR:
        return {
          ...state,
          success: false,
          error: action.error,
        }

        case POST_HONEST_SIGN_REQUEST:
          return {
            ...state,
            success: true,
          }
        case POST_HONEST_SIGN_SUCCESS:
          return {
            ...state,
            statusHonest: action.status,
            success: false,
          }
        case POST_HONEST_SIGN_ERROR:
          return {
            ...state,
            success: false,
            error: action.error,
          }
    default:
      return state;
  }
}