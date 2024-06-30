import { Component, Input, input, output, signal, effect } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTask, Task } from './tasks.model';
import { NewTackComponent } from './new-tack/new-tack.component';
import { TaskService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, NewTackComponent],
})
export class TasksComponent {
  constructor(private taskService: TaskService) {}

  name = input.required();
  selectedUser = input();

  get tasks() {
    return this.taskService.getUsersTasks(this.selectedUser() as string);
  }

  modal = signal<boolean>(false);

  openModal() {
    this.modal.set(true);
  }

  onTackCansel(conf: boolean) {
    this.modal.set(conf);
  }

  addTasks(task: NewTask) {
    this.taskService.addTask(task, this.selectedUser() as string);
  }
}
