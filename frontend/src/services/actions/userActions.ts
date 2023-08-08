import {
  getUserApi,
  registerPrinterApi,
  registerTableApi,
} from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { IRegisterPrinter, IRegisterTable } from "../../utils/type/data";
import { AppDispatch } from "../../utils/type/store";

export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_ERROR: "GET_USER_ERROR" = "GET_USER_ERROR";

export const REGISTRATION_TABLE_REQUEST: "REGISTRATION_TABLE_REQUEST" =
  "REGISTRATION_TABLE_REQUEST";
export const REGISTRATION_TABLE_SUCCESS: "REGISTRATION_TABLE_SUCCESS" =
  "REGISTRATION_TABLE_SUCCESS";
export const REGISTRATION_TABLE_ERROR: "REGISTRATION_TABLE_ERROR" =
  "REGISTRATION_TABLE_ERROR";

export const REGISTRATION_PRINTER_REQUEST: "REGISTRATION_PRINTER_REQUEST" =
  "REGISTRATION_PRINTER_REQUEST";
export const REGISTRATION_PRINTER_SUCCESS: "REGISTRATION_PRINTER_SUCCESS" =
  "REGISTRATION_PRINTER_SUCCESS";
export const REGISTRATION_PRINTER_ERROR: "REGISTRATION_PRINTER_ERROR" =
  "REGISTRATION_PRINTER_ERROR";

export const EXIT_SUCCESS: "EXIT_SUCCESS" = "EXIT_SUCCESS";
export const EXIT_ERROR: "EXIT_ERROR" = "EXIT_ERROR";

export function registerTable({ userId, valueTable }: IRegisterTable) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTRATION_TABLE_REQUEST,
    });
    console.log(userId);
    console.log(valueTable);
    registerTableApi({ userId, valueTable })
      .then((res) => {
        if (res && res.success) {
          console.log(res);
          setCookie("token", res.token.split("Bearer ")[1]);
          dispatch({
            type: REGISTRATION_TABLE_SUCCESS,
            token: res.token.split("Bearer ")[1],
          });
        } else {
          dispatch({
            type: REGISTRATION_TABLE_ERROR,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: REGISTRATION_TABLE_ERROR,
          error: err.message,
        });
      });
  };
}

export function registerPrinter({ valuePrinter }: IRegisterPrinter) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTRATION_PRINTER_REQUEST,
    });
    console.log(valuePrinter);
    registerPrinterApi({ valuePrinter })
      .then((res) => {
        if (res && res.success) {
          console.log(res);
          dispatch({
            type: REGISTRATION_PRINTER_SUCCESS,
            user: res.user,
          });
        } else {
          dispatch({
            type: REGISTRATION_PRINTER_ERROR,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: REGISTRATION_PRINTER_ERROR,
          error: err.message,
        });
      });
  };
}

export function getUser() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUserApi()
      .then((res) => {
        console.log(res);
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            data: res.data,
          });
        } else {
          dispatch({
            type: GET_USER_ERROR,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_USER_ERROR,
          error: err.message,
        });
      });
  };
}
