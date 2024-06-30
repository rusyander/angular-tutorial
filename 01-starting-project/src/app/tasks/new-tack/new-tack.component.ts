import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask, Task } from '../tasks.model';

@Component({
  selector: 'app-new-tack',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-tack.component.html',
  styleUrl: './new-tack.component.css',
})
export class NewTackComponent {
  isModal = output<boolean>();
  add = output<NewTask>();

  enteredTitle = signal<string>('');
  enteredSummary = signal<string>('');
  enteredDueDate = signal<string>('');

  onClose() {
    this.isModal.emit(false);
  }

  onSubmit() {
    if (
      !this.enteredTitle() ||
      !this.enteredSummary() ||
      !this.enteredDueDate()
    )
      return;

    const newTask: NewTask = {
      title: this.enteredTitle(),
      summary: this.enteredSummary(),
      dueDate: this.enteredDueDate(),
      id: Date.now().toString(),
    };

    this.add.emit(newTask);

    this.onClose();
  }
}
