import { postBarcodeApi, postHonestSignApi, postImeiApi } from '../../utils/api';
import { IBarcode, IHonestSign, IImei } from '../../utils/type/data';
import { AppDispatch } from "../../utils/type/store";

export const POST_BARCODE_REQUEST: 'POST_BARCODE_REQUEST' = 'POST_BARCODE_REQUEST';
export const POST_BARCODE_SUCCESS: 'POST_BARCODE_SUCCESS' = 'POST_BARCODE_SUCCESS';
export const POST_BARCODE_ERROR: 'POST_BARCODE_ERROR' = 'POST_BARCODE_ERROR';

export const POST_IMEI_REQUEST: 'POST_IMEI_REQUEST' = 'POST_IMEI_REQUEST';
export const POST_IMEI_SUCCESS: 'POST_IMEI_SUCCESS' = 'POST_IMEI_SUCCESS';
export const POST_IMEI_ERROR: 'POST_IMEI_ERROR' = 'POST_IMEI_ERROR';

export const POST_HONEST_SIGN_REQUEST: 'POST_HONEST_SIGN_REQUEST' = 'POST_HONEST_SIGN_REQUEST';
export const POST_HONEST_SIGN_SUCCESS: 'POST_HONEST_SIGN_SUCCESS' = 'POST_HONEST_SIGN_SUCCESS';
export const POST_HONEST_SIGN_ERROR: 'POST_HONEST_SIGN_ERROR' = 'POST_HONEST_SIGN_ERROR';

export function postBarcode ({inputValue}: IBarcode) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: POST_BARCODE_REQUEST
    });
    console.log(inputValue);
    postBarcodeApi({inputValue})
      .then(res => {
        console.log(res);

        if(res && res.success) {
          dispatch({
            type: POST_BARCODE_SUCCESS,
            data: res.data
          })
        } else {
          dispatch({
            type: POST_BARCODE_ERROR,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_BARCODE_ERROR,
          error: err.message,
        })
      });
  }
}

export function postImei ({barcode, inputValue}: IImei) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: POST_IMEI_REQUEST
    });
    postImeiApi({barcode, inputValue})
      .then(res => {
        if(res && res.success) {
          dispatch({
            type: POST_IMEI_SUCCESS,
            status: res.status
          })
        } else {
          dispatch({
            type: POST_IMEI_ERROR,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_IMEI_ERROR,
          error: err.message,
        })
      });
  }
}

export function postHonestSign ({barcode, inputValue}: IHonestSign) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: POST_HONEST_SIGN_REQUEST
    });
    postHonestSignApi({barcode, inputValue})
      .then(res => {
        if(res && res.success) {
          dispatch({
            type: POST_HONEST_SIGN_SUCCESS,
            status: res.status
          })
        } else {
          dispatch({
            type: POST_HONEST_SIGN_ERROR,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_HONEST_SIGN_ERROR,
          error: err.message,
        })
      });
  }
}