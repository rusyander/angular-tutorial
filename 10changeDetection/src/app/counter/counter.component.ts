import {
  ChangeDetectionStrategy,
  Component,
  inject,
  NgZone,
  OnInit,
  signal,
} from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
  count = signal(0);
  private zone = inject(NgZone); // Inject NgZone

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.count.set(0);
    }, 4000);

    this.zone.runOutsideAngular(() => {
      // это метод runOutsideAngular() из NgZone позволяет выполнить код вне зоны Angular
      setTimeout(() => {
        console.log('timer exited');
      }, 5000);
    });
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
