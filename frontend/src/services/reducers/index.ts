import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { orderReducer } from "./orderReducer";

export const rootReducer = combineReducers({
  userInfo: userReducer,
  orderInfo: orderReducer,
})