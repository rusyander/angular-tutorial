import { Component, input, output } from '@angular/core';
import { Task } from '../tasks.model';
import { CardComponent } from '../../shared/card/card.component';
import { DatePipe } from '@angular/common';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [CardComponent, DatePipe],
})
export class TaskComponent {
  constructor(private taskService: TaskService) {}

  task = input.required<Task>();

  onSelectTask(id: string) {
    if (!id) return;
    this.taskService.removeTask(id);
  }
}
