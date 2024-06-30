import {
  Component,
  Input,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.css',
})
export class LifecycleComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() text?: string;

  constructor() {
    // это первый метод, который вызывается при создании компонента
    console.log('CONSTRUCTOR');
  }
  ngOnChanges(changes: SimpleChanges) {
    // вызывается после ngOnInit, когда происходит изменение входных данных
    console.log('ngOnChanges');
    console.log(changes);
  }

  ngOnInit() {
    // это первый метод, который вызывается после конструктора
    console.log('ngOnInit');
  }

  ngDoCheck() {
    // вызывается после ngOnChanges, когда происходит изменение входных данных
    console.log('ngDoCheck');
  }

  ngAfterContentInit() {
    // вызывается после ngDoCheck, когда происходит изменение входных данных
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    // вызывается после ngAfterContentInit, когда происходит изменение входных данных
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit() {
    // вызывается после ngAfterContentChecked, когда происходит изменение входных данных
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    // вызывается после ngAfterViewInit, когда происходит изменение входных данных
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy() {
    // вызывается после ngAfterViewChecked, когда происходит изменение входных данных
    console.log('ngOnDestroy');
  }
}
