import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  private tasksService = inject(TasksService);
  // order = input<'asc' | 'desc'>();

  order = signal<'asc' | 'desc'>('asc');

  private activeRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe({
      next: (params) => {
        console.log(params['order']);
        this.order.set(params['order'] || 'asc');
      },
    });
  }

  userTasks = computed<Task[]>(() => {
    // if( this.order === 'asc') {
    return this.order() === 'asc'
      ? this.tasksService
          .allTasks()
          .filter((task) => task.userId === this.userId())
      : this.tasksService
          .allTasks()
          .filter((task) => task.userId === this.userId())
          .reverse();

    // return this.tasksService
    //   .allTasks()
    //   .filter((task) => task.userId === this.userId())
    //   .sort((a: Task, b: Task): any => {
    //     if (this.order() === 'desc') {
    //       a.id > b.id ? 1 : -1;
    //     } else {
    //       a.id > b.id ? -1 : 1;
    //     }
    //   });
  });
}
