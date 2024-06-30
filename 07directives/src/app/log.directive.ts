import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog($event)', // Подписываемся на событие клика
  },
})
export class LogDirective {
  private elementRef = inject(ElementRef); // Получаем ссылку на элемент, к которому применяется директива

  constructor() {}

  onLog() {
    // Обработчик события клика
    console.log('CLICKED');
    console.log(this.elementRef.nativeElement);
  }
}
