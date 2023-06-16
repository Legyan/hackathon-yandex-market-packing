import { registerPrinterApi, registerTableApi } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { IRegisterPrinter, IRegisterTable } from "../../utils/type/data";
import { AppDispatch } from "../../utils/type/store";

export const REGISTRATION_TABLE_REQUEST: 'REGISTRATION_TABLE_REQUEST' = 'REGISTRATION_TABLE_REQUEST';
export const REGISTRATION_TABLE_SUCCESS: 'REGISTRATION_TABLE_SUCCESS' = 'REGISTRATION_TABLE_SUCCESS';
export const REGISTRATION_TABLE_ERROR: 'REGISTRATION_TABLE_ERROR' = 'REGISTRATION_TABLE_ERROR';

export const REGISTRATION_PRINTER_REQUEST: 'REGISTRATION_PRINTER_REQUEST' = 'REGISTRATION_PRINTER_REQUEST';
export const REGISTRATION_PRINTER_SUCCESS: 'REGISTRATION_PRINTER_SUCCESS' = 'REGISTRATION_PRINTER_SUCCESS';
export const REGISTRATION_PRINTER_ERROR: 'REGISTRATION_PRINTER_ERROR' = 'REGISTRATION_PRINTER_ERROR';

export const EXIT_SUCCESS: 'EXIT_SUCCESS' = 'EXIT_SUCCESS';
export const EXIT_ERROR: 'EXIT_ERROR' = 'EXIT_ERROR';

export function registerTable({userId, inputValue}: IRegisterTable) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: REGISTRATION_TABLE_REQUEST
    });
    registerTableApi({userId, inputValue})
          .then(res => {
            if (res && res.success) {
              setCookie('token', res.token.split('Bearer ')[1]);
              dispatch({
                type: REGISTRATION_TABLE_SUCCESS,
                token: res.token.split('Bearer ')[1]
              });
            } else {
              dispatch({
                type: REGISTRATION_TABLE_ERROR,
              });
            }
          })
          .catch((err) => {
            dispatch({
              type: REGISTRATION_TABLE_ERROR,
              error: err.message,
            })
          });
  }
}

export function registerPrinter({inputValue}: IRegisterPrinter) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: REGISTRATION_PRINTER_REQUEST
    });
    registerPrinterApi({inputValue})
          .then(res => {
            if (res && res.success) {
              dispatch({
                type: REGISTRATION_PRINTER_SUCCESS,
                user: res.user
              });
            } else {
              dispatch({
                type: REGISTRATION_PRINTER_ERROR,
              });
            }
          })
          .catch((err) => {
            dispatch({
              type: REGISTRATION_PRINTER_ERROR,
              error: err.message,
            })
          });
  }
}