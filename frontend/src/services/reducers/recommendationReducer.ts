import { IRecPacking } from "../../utils/type/data";
import {
  RECOMMENDATION,
  SELECT_COUNTER,
  SELECT_RECOMMENDATION,
} from "../actions/recommendationAction";

const initialState = {
  recommendation: null,
  index: 0,
};

interface IState {
  recommendation: Array<IRecPacking> | null;
  index: number;
}

export interface IRecommendation {
  readonly type: typeof RECOMMENDATION;
  data: Array<IRecPacking>;
}

export interface IRecommendationReducer {
  readonly type: typeof SELECT_RECOMMENDATION;
  data: Array<IRecPacking>;
  index: number;
}

export interface ISelectCounter {
  readonly type: typeof SELECT_COUNTER;
  index: number;
}

export type TActionsRecommendation =
  | IRecommendation
  | IRecommendationReducer
  | ISelectCounter;

export const recommendationReducer = (
  state: IState = initialState,
  action: TActionsRecommendation
): IState => {
  switch (action.type) {
    case RECOMMENDATION:
      return {
        ...state,
        recommendation: action.data,
      };
    case SELECT_RECOMMENDATION:
      return {
        ...state,
        recommendation: action.data,
        index: action.index,
      };
    case SELECT_COUNTER:
      return {
        ...state,
        index: action.index,
      };
    default:
      return state;
  }
};
