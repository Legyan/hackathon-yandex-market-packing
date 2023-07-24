import { IRecPacking } from "../../utils/type/data"
import { FIRST_RECOMMENDATION, SELECT_RECOMMENDATION } from "../actions/recommendationAction";

const initialState = {
  recommendation: null,
  index: 0,
  // [
  //   {
  //     cartontype: '',
  //     icontype: '',
  //     items: [{
  //       sku: '',
  //       count: 0
  //     }]
  //   }
  // ]
}

interface IState {
  recommendation: Array<IRecPacking> | null  ;
  index: number;
}

export interface IFirstRecommendation {
  readonly type: typeof FIRST_RECOMMENDATION;
  data: Array<IRecPacking>;
}

export interface IRecommendationReducer {
  readonly type: typeof SELECT_RECOMMENDATION;
  data: Array<IRecPacking>;
  index: number;
}

export type TActionsRecommendation =
  IFirstRecommendation
  |IRecommendationReducer

export const recommendationReducer = (state: IState = initialState, action: TActionsRecommendation): IState => {
  switch(action.type) {
    case FIRST_RECOMMENDATION:
      return {
        ...state,
        recommendation: action.data,
      }
    case SELECT_RECOMMENDATION:
    return {
      ...state,
      recommendation: action.data,
      index: action.index,
    }
    default:
      return state;
  }
}