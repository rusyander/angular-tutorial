import { createReducer, on } from '@ngrx/store';
import { increment, decrement, set } from './counter.action';

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => state + action.value),
  on(decrement, (state, action) => state - action.value),
  on(set, (state, action) => action.value)
);

// export function counterReducer(
//   state = initialState,
//   action: IncrementActionType | Action
// ) {
//   if (action.type === '[Counter] Increment') {
//     return state + action.value;
//   }
//   if (action.type === '[Counter] Decrement') {
//     return state - action.value;
//   }
//   return state;
// }
