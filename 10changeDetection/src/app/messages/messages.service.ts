import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// export class MessagesService {
//   messages$ = new BehaviorSubject<string[]>([]); // BehaviorSubject - это специальный тип Observable, который хранит последнее значение, которое он отправил своим подписчикам
//   messages: string[] = [];

//   get allMessages() {
//     return [...this.messages];
//   }

//   addMessage(message: string) {
//     this.messages = [...this.messages, message]; // добавляем новое сообщение в массив сообщений
//     this.messages$.next([...this.messages]); // next() - это метод BehaviorSubject, который отправляет новое значение всем подписчикам
//   }
// }
export class MessagesService {
  messages = signal<string[]>([]);
  allMessages = this.messages.asReadonly();

  addMessage(message: string) {
    this.messages.update((prevMessages) => [...prevMessages, message]);
  }
}
