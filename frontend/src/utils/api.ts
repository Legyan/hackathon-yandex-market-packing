import { apiUrl } from "./constants";
import { getCookie } from "./cookie";
import {
  IBarcode,
  IDataValues,
  IHonestSign,
  IImei,
  IOrder,
  IRegisterPrinter,
  IRegisterTable,
  IResponseBarcode,
  IResponsePrinter,
  IResponseTable,
  IStatus,
  IUser,
} from "./type/data";

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

export async function registerTableApi({userId, valueTable}: IRegisterTable) {
  return await request<IResponseTable>(apiUrl + 'register/table', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      table_id: valueTable,
    }),
  });
}

export async function registerPrinterApi({valuePrinter}: IRegisterPrinter) {
  return await request<IResponsePrinter>(apiUrl + 'register/printer', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    },
    body: JSON.stringify({
      printer_id: valuePrinter,
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
  return await request<IDataValues<IStatus>>(apiUrl + 'user/logout', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    }
  });
}

export async function postBarcodeApi({inputValue}: IBarcode) {
  return await request<IDataValues<IResponseBarcode>>(apiUrl + 'barcode', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    },
    body: JSON.stringify({
      barcode: inputValue,
    }),
  });
}

export async function postImeiApi({barcode, inputValue}: IImei ) {
  return await request<IDataValues<IImei>>(apiUrl + 'barcode/imei', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    },
    body: JSON.stringify({
      barcode: barcode,
      imei: inputValue
    }),
  });
}

export async function postHonestSignApi({barcode, inputValue}: IHonestSign) {
  return await request<IDataValues<IHonestSign>>(apiUrl + 'barcode/honest_sign', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    },
    body: JSON.stringify({
      barcode: barcode,
      honest_sign: inputValue,
    }),
  });
}

export async function removeItemApi({inputValue}: IBarcode) {
  return await request<IDataValues<IStatus>>(apiUrl + 'package/remove_item', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    },
    body: JSON.stringify({
      barcode: [inputValue],
    }),
  });
}

export async function closeBoxApi() {
  return await request<IDataValues<IStatus>>(apiUrl + 'package/close', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    }
  });
}

export async function finishOrderApi() {
  return await request<IDataValues<IStatus>>(apiUrl + 'order/finish', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token")
    }
  });
}