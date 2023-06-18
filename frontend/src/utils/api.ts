import { apiUrl } from "./constants";
import { getCookie } from "./cookie";
import { IBarcode, IDataValues, IOrder, IRegisterPrinter, IRegisterTable, IResponsePrinter, IResponseTable, IStatus } from "./type/data";
import { IUser } from "./type/main";

const checkRes = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json()
  } else {
    throw Error(`error ${res}`)
  }
}

type TRequest = <T>(url: string, options?: RequestInit) => Promise<T>;

const request: TRequest = async <T>(url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  const result: Promise<T> = checkRes(res);
  return result;
}

export async function registerTableApi({userId, inputValue}: IRegisterTable) {
  return await request<IResponseTable>(apiUrl + 'register/table', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      table_id: inputValue,
    }),
  });
}

export async function registerPrinterApi({inputValue}: IRegisterPrinter) {
  return await request<IResponsePrinter>(apiUrl + 'register/printer', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    },
    body: JSON.stringify({
      printer_id: inputValue,
    }),
  });
}

export async function getOrderApi() {
  return await request<IDataValues<IOrder>>(apiUrl + 'order', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    }
  });
}

export async function getUserApi() {
  return await request<IDataValues<IUser>>(apiUrl + 'user', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    }
  });
}

export async function logoutApi() {
  return await request<IDataValues<IStatus>>(apiUrl + 'package/close', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    }
  });
}

export async function postBarcodeApi({barcode}: IBarcode) {
  return await request<IDataValues<IBarcode>>(apiUrl + 'barcode', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    },
    body: JSON.stringify({
      barcode: barcode,
    }),
  });
}

export async function postImeiApi({barcode, imei}: IBarcode) {
  return await request<IDataValues<IBarcode>>(apiUrl + 'barcode/imei', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    },
    body: JSON.stringify({
      barcode: barcode,
      imei: imei
    }),
  });
}

export async function postHonestSignApi({barcode, honest_sign}: IBarcode) {
  return await request<IDataValues<IBarcode>>(apiUrl + 'barcode/honest_sign', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    },
    body: JSON.stringify({
      barcode: barcode,
      honest_sign: honest_sign,
    }),
  });
}

export async function removeItemApi({barcode}: IBarcode) {
  return await request<IDataValues<IStatus>>(apiUrl + 'package/remove_item', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    },
    body: JSON.stringify({
      barcode: [barcode],
    }),
  });
}