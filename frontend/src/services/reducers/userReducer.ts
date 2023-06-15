import { IUser } from "../../utils/type/main";
import {
  REGISTRATION_PRINTER_ERROR,
  REGISTRATION_PRINTER_REQUEST,
  REGISTRATION_PRINTER_SUCCESS,
  REGISTRATION_TABLE_ERROR,
  REGISTRATION_TABLE_REQUEST,
  REGISTRATION_TABLE_SUCCESS,
} from "../actions/userActions";

const initialState = {
  success: false,
  error: '',
  user: {
    user_id: '',
    table_id: '',
    printer_id: '',
  },
  token: '',
}

interface IState {
  success: boolean;
  error?: string | boolean;
  user: IUser;
  token: string;
}

export interface IRegistrationTableRequest {
  readonly type: typeof REGISTRATION_TABLE_REQUEST;
}

export interface IRegistrationTableSuccess {
  readonly type: typeof REGISTRATION_TABLE_SUCCESS;
  token: string;
}

export interface IRegistrationTableError {
  readonly type: typeof REGISTRATION_TABLE_ERROR;
  error?: string;
}

export interface IRegistrationPrinterRequest {
  readonly type: typeof REGISTRATION_PRINTER_REQUEST;
}

export interface IRegistrationPrinterSuccess {
  readonly type: typeof REGISTRATION_PRINTER_SUCCESS;
  user: IUser;
}

export interface IRegistrationPrinterError {
  readonly type: typeof REGISTRATION_PRINTER_ERROR;
  error?: string;
}

export type TActionUser =
  IRegistrationTableRequest
  | IRegistrationTableSuccess
  | IRegistrationTableError
  | IRegistrationPrinterRequest
  | IRegistrationPrinterSuccess
  | IRegistrationPrinterError


export const userReducer = (state: IState = initialState, action: TActionUser): IState => {
  switch(action.type) {
    case REGISTRATION_TABLE_REQUEST:
      return {
        ...state,
        success: true,
      };
    case REGISTRATION_TABLE_SUCCESS:
      return {
        ...state,
        token: action.token,
      };
    case REGISTRATION_TABLE_ERROR:
      return {
        ...state,
        success: false,
        error: action.error,
      }

    case REGISTRATION_PRINTER_REQUEST:
      return {
        ...state,
        success: true,
      }
    case REGISTRATION_PRINTER_SUCCESS:
      return {
        ...state,
        user: action.user,
      }
    case REGISTRATION_PRINTER_ERROR:
      return {
        ...state,
        success: false,
        error: action.error,
      }
    default:
      return state;
  }
}