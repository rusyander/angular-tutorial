import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  imports: [AsyncPipe],
})
// export class MessagesListComponent {
//   private messagesService = inject(MessagesService);

//   message$ = this.messagesService.messages$;

//   get debugOutput() {
//     console.log('[MessagesList] "debugOutput" binding re-evaluated.');
//     return 'MessagesList Component Debug Output';
//   }
// }
export class MessagesListComponent {
  private messagesService = inject(MessagesService);
  // private cdRef = inject(ChangeDetectorRef); // ChangeDetectorRef это сервис, который предоставляет методы для управления обнаружением изменений в Angular
  // private destroyRef = inject(DestroyRef);

  // messages: string[] = [];
  messages = this.messagesService.allMessages;

  // get messages() {
  //   return this.messagesService.messages();
  // }

  // ngOnInit(): void {
  //   const messageSubsc = this.messagesService.messages$.subscribe((message) => {
  //     this.messages = message; // messages - это свойство сервиса MessagesService, которое содержит массив сообщений
  //     this.cdRef.markForCheck(); // markForCheck() - это метод ChangeDetectorRef, который помечает компонент и его дочерние компоненты для проверки изменений
  //   });

  //   this.destroyRef.onDestroy(() => {
  //     messageSubsc.unsubscribe();
  //   });
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
