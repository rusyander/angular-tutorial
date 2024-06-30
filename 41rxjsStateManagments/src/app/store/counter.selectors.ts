import { createSelector } from '@ngrx/store';

export const selectCount = (state: { counter: number }) => {
  return state.counter;
};

// export const selectCounterDouble = (state: { counter: number }) => {
//   return state.counter * 2;
// };

export const selectCounterDouble = createSelector(
  selectCount,
  (counter) => counter * 2
);
