import { IRecPacking } from "../../utils/type/data"

export const RECOMMENDATION: 'FIRST_RECOMMENDATION' = 'FIRST_RECOMMENDATION';
export const SELECT_RECOMMENDATION: 'SELECT_RECOMMENDATION' = 'SELECT_RECOMMENDATION';
export const SELECT_COUNTER: 'SELECT_COUNTER' = 'SELECT_COUNTER';

export const Recommendation = (data: Array<IRecPacking>) => ({
  type: RECOMMENDATION,
  data: data,
})

export const SelectCounter = (counter: number) => ({
  type: SELECT_COUNTER,
  index: counter
})

export const selectRecommendation = (data: Array<IRecPacking>, index: number) => ({
  type: SELECT_RECOMMENDATION,
  data: data,
  index: index,
})