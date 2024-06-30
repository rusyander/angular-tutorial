import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]', // Применяем директиву к элементу a с атрибутом appSafeLink
  standalone: true, // Директива является самостоятельной
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' }); // Позволяет использовать директиву с другим именем
  private authService = inject(AuthService); // получаем ссылку на сервис откуда будем брать роль
  private templateRef = inject(TemplateRef); // Получаем ссылку на шаблон
  private viewContainerRef = inject(ViewContainerRef); // Получаем ссылку на контейнер представления

  constructor() {
    effect(() => {
      // Подписываемся на изменения роли
      if (this.authService.activePermission() === this.userType()) {
        // Если роль пользователя совпадает с указанной в директиве
        this.viewContainerRef.createEmbeddedView(this.templateRef); // Отображаем шаблон
      } else {
        this.viewContainerRef.clear(); // Скрываем шаблон
      }
    });
  }
}
