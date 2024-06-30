import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]', // Применяем директиву к элементу a с атрибутом appSafeLink
  standalone: true, // Директива является самостоятельной
  host: {
    // Подписываемся на событие клика
    '(click)': 'onConfirmedPage($event)', // Подписываемся на событие клика
  },
})
export class SafeLinkDirective {
  queryParams = input('myapp');
  // queryParams = input('myapp', {alias:'appSafeLink'}); // Позволяет использовать директиву с другим именем

  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef); // Получаем ссылку на элемент, к которому применяется директива

  constructor() {
    console.log('SafeLinkDirective');
  }

  onConfirmedPage(e: MouseEvent) {
    const confirmed = window.confirm(
      'Are you sure you want to leave this page?'
    );

    if (confirmed) {
      //   const address = (e.target as HTMLAnchorElement).href; // Получаем адрес ссылки
      //   (e.target as HTMLAnchorElement).href =
      //     address + '?from=' + this.queryParams(); // Добавляем параметр к адресу ссылки

      const address = this.hostElementRef.nativeElement.href; // Получаем адрес ссылки
      this.hostElementRef.nativeElement.href =
        address + '?from=' + this.queryParams(); // Добавляем параметр к адресу ссылки

      return true;
    }
    e.preventDefault();

    return false;
  }
}
