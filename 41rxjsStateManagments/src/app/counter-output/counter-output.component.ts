import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCount, selectCounterDouble } from '../store/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
  imports: [AsyncPipe],
  standalone: true,
})
export class CounterOutputComponent {
  count$: Observable<number>;
  countDouble$: Observable<number>;

  constructor(private store: Store<{ counter: number }>) {
    // this.count$ = store.select('counter');

    this.count$ = store.select(selectCount);
    this.countDouble$ = store.select(selectCounterDouble);

    // this.count$.subscribe((count) => {
    //   console.log('count:', count);
    // });
  }
}
