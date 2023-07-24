import { IRecPacking } from "../../utils/type/data"

export const FIRST_RECOMMENDATION: 'FIRST_RECOMMENDATION' = 'FIRST_RECOMMENDATION';
export const SELECT_RECOMMENDATION: 'SELECT_RECOMMENDATION' = 'SELECT_RECOMMENDATION';

export const firstRecommendation = (data: Array<IRecPacking>) => ({
  type: FIRST_RECOMMENDATION,
  data: data,
})

export const selectRecommendation = (data: Array<IRecPacking>, index: number) => ({
  type: SELECT_RECOMMENDATION,
  data: data,
  index: index,
})