import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { orderReducer } from './orderReducer';
import { recommendationReducer } from './recommendationReducer';
import { barcodeReducer } from './barcodeReducer';

export const rootReducer = combineReducers({
  userInfo: userReducer,
  orderInfo: orderReducer,
  recommendationInfo: recommendationReducer,
  barcodeInfo: barcodeReducer,
})