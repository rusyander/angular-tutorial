import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { decrement, increment, init, set } from './counter.action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class CounterEffects {
  loadCount = createEffect(() => {
    // createEffect это функция, которая создает эффект
    return this.actions$.pipe(
      // actions$ это стрим всех экшенов, которые диспатчатся в приложении
      ofType(init), // ofType это оператор, который позволяет отслеживать определенные экшены
      switchMap(() => {
        // switchMap это оператор, который позволяет переключиться на другой стрим
        const storedCount = localStorage.getItem('count'); // получаем значение из localStorage
        return storedCount // возвращаем стрим
          ? of(set({ value: +storedCount })) // если значение есть, то возвращаем экшен set, of - это функция, которая создает стрим, set - это экшен который мы сами создали
          : of(set({ value: 0 })); // если значения нет, то возвращаем экшен set, of - это функция, которая создает стрим, set - это экшен который мы сами создали
      })
    );
  });

  saveCount = createEffect(
    () => {
      // createEffect это функция, которая создает эффект
      return this.actions$.pipe(
        // actions$ это стрим всех экшенов, которые диспатчатся в приложении
        ofType(increment, decrement), // actions increment это экшены, которые мы хотим отслеживать, можно указать несколько
        withLatestFrom(this.store.select('counter')), //  withLatestFrom это оператор, который позволяет объединить два стрима, 'counter' но можно использовать и селекторы
        tap(([action, counter]) => {
          // tap это оператор, который позволяет выполнить побочный эффект
          console.log(action);
          localStorage.setItem('count', counter.toString());
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ counter: number }>
  ) {}
}
