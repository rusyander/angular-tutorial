import {
  Component,
  computed,
  signal,
  Input,
  input,
  Output,
  EventEmitter,
  output,
} from '@angular/core';
import { User } from './user.mode';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [CardComponent],
})
export class UserComponent {
  user = input.required<User>();
  selectedUserActive = input.required();

  select = output<string>();

  userImage = computed(() => 'assets/users/' + this.user().avatar);

  isSame: boolean = false;

  onSelectUser(id: string) {
    if (!id) return;
    this.select.emit(id);
    this.isSame = id === this.selectedUserActive() ? true : false;

    console.log(this.selectedUserActive());
  }

  // onSelectUser(id: string) {
  //   if (!this.selectedUser) return;
  //   console.log('onSelectUser', id);

  // const currentUser = this.users().find((user) => user.id === id);
  // this.selectedUser.set(this.users()[randomIndex]);
  // }

  // @Input({ required: true }) user!: User;
  // @Output() select = new EventEmitter<string>();

  // randomIndex = computed(() => Math.floor(Math.random() * DUMMY_USERS.length));

  // users = signal<User[]>(DUMMY_USERS);
}
