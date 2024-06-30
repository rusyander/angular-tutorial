import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  title = 'app';

  clickable = signal<number>(0);
  interval = signal<number>(0);
  doubleInterval = computed(() => this.interval() * 2);

  clickable$ = toObservable(this.clickable);
  // interval$ = interval(1000)
  //   .pipe(map((val) => val * 5))
  //   .subscribe({
  //     next: (val: number) => this.interval.update(() => val),
  //   });

  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {
    initialValue: 0,
    manualCleanup: true,
  });

  // Custom oservable interval
  customInterval$ = new Observable((subscriber) => {
    let i = 10;
    const id = setInterval(() => {
      if (i === 15) {
        clearInterval(id);
        subscriber.complete();
        return;
      }
      if (i >= 16) {
        // условие ошибки
        subscriber.error(new Error('Error')); // генерация ошибки
      }

      console.log('customInterval$', i++);

      subscriber.next({ message: 'new Value' });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  });

  constructor() {
    // effect(() => {
    //   console.log('clickable', this.clickable());
    // });
  }

  ngOnInit() {
    // console.log('Hello from AppComponent');
    // setInterval(() => {
    //   this.interval.update((val) => val + 1);
    //   console.log(this.doubleInterval());
    // }, 5000);

    const subscrb = interval(5000)
      .pipe(
        map((val: number) => {
          return val * 2;
        })
      )
      .subscribe({
        next: (val: number) => console.log('interval', val),
        complete: () => {
          console.log('interval complete');
          subscrb.unsubscribe();
        },
        error: (err: Error) => console.log('interval error', err),
      });

    // this.destroyRef.onDestroy(() => {
    //   console.log('AppComponent destroyed');
    //   subscrb.unsubscribe();
    // });

    const sub = this.clickable$.subscribe({
      next: (val: number) => console.log('clickable$', val),
      complete: () => console.log('clickable$ complete'),
      error: (err: Error) => console.log('clickable$ error', err),
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });

    this.customInterval$.subscribe({
      next: (val) => console.log('customInterval$', val),
      complete: () => console.log('customInterval$ complete'),
      error: (err: Error) => console.log('customInterval$ error', err),
    });
  }

  onClick() {
    this.clickable.update((val) => val + 1);
  }
}
