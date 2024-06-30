import { Component } from '@angular/core';

import { CounterService } from '../counter.service';
import { Store } from '@ngrx/store';
import { decrement, increment } from '../store/counter.action';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrls: ['./counter-controls.component.css'],
  standalone: true,
})
export class CounterControlsComponent {
  constructor(private store: Store<{ counter: number }>) {}

  increment() {
    this.store.dispatch(increment({ value: 5 }));
  }

  // increment() {
  //   this.store.dispatch(new IncrementAction({ value: 5 }));
  // }

  decrement() {
    this.store.dispatch(decrement({ value: 5 }));
  }
}
