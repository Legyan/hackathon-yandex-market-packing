import { apiUrl } from "./constants";
import { getCookie } from "./cookie";
import { IDataValues, IOrder, IRegisterPrinter, IRegisterTable, IResponsePrinter, IResponseTable } from "./type/data";

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
  console.log(userId);
  console.log(inputValue)
  return await request<IResponseTable>(apiUrl + 'register_table', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      table_id: inputValue,
    }),
  });
}

export async function registerPrinterApi({inputValue}: IRegisterPrinter) {
  console.log(inputValue);
  console.log("Bearer " + getCookie("token"));
  return await request<IResponsePrinter>(apiUrl + 'register_printer', {
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