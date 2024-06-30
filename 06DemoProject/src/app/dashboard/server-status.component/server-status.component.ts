import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
  imports: [],
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  private destroyRef = inject(DestroyRef);

  // currentStatus = 'online';
  currentStatus = signal<'online' | 'offline' | 'unknown'>('online');

  private interval?: ReturnType<typeof setInterval>;

  constructor() {
    effect((onCleanup) => {
      console.log('Current status:', this.currentStatus());

      // const tasks = getTasks();
      const timer = setTimeout(() => {
        // console.log(`Current number of tasks: ${tasks().length}`);
      }, 1000);
      onCleanup(() => {
        clearTimeout(timer);
      });
    });
  }

  ngOnInit(): void {
    // this.interval = setInterval(() => {
    const interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }

  ngOnDestroy(): void {
    console.log('ServerStatusComponent destroyed');
    clearInterval(this.interval!);
  }
}
