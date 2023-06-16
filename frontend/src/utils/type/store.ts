import { useDispatch as dispatchHook, useSelector as selectorHook, TypedUseSelectorHook } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../../services/store";
import { TActionsUser } from '../../services/reducers/userReducer';
import { TActionsOrder } from "../../services/reducers/orderReducer";

export type TApplicationActions = TActionsUser | TActionsOrder;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;