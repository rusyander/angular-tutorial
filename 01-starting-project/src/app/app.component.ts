import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/head.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './mock/dummy-users';
import { TasksComponent } from './tasks/tasks.component';

interface User {
  id: string;
  name: string;
  avatar: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, UserComponent, TasksComponent],
})
export class AppComponent {
  users = signal<User[]>(DUMMY_USERS);
  selectedUser = signal<string | null>(null);

  get selectedName() {
    return this.users().find((user) => user.id === this.selectedUser())?.name;
  }

  onSelectId(id: string) {
    this.selectedUser.set(id);
  }

  counter = signal<number>(0);

  increment() {
    // this.counter.set(this.counter() + 1);
    this.counter.update((prev) => prev + 1);
  }

  decrement() {
    this.counter.set(this.counter() - 1);
  }
}
