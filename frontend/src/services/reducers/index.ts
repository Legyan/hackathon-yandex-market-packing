import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { orderReducer } from "./orderReducer";
import { recommendationReducer } from "./recommendationReducer";

export const rootReducer = combineReducers({
  userInfo: userReducer,
  orderInfo: orderReducer,
  recommendationInfo: recommendationReducer,
})