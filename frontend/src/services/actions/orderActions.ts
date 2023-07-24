import { getOrderApi } from "../../utils/api";
import { AppDispatch } from "../../utils/type/store";

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR: 'GET_ORDER_ERROR' = 'GET_ORDER_ERROR';
export const GET_ORDER_NO_ORDERS: 'GET_ORDER_NO_ORDERS' = 'GET_ORDER_NO_ORDERS';

export function getOrder () {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderApi()
      .then(res => {
        if (res && res.status) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            data: res.data,
            status: res.status
          })
        } else if (res && res.status === 'No orders to pack') {
          dispatch({
            type: GET_ORDER_NO_ORDERS,
            status: res.status
          })
        } else {
          dispatch({
            type: GET_ORDER_ERROR,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_ERROR,
          error: err.message,
        })
      });
  }
}