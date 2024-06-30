import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  initialData = signal<Task[]>([
    { title: 'Task 1', description: 'Description 1', id: '1', status: 'OPEN' },
    {
      title: 'Task 2',
      description: 'Description 2',
      id: '2',
      status: 'IN_PROGRESS',
    },
    { title: 'Task 3', description: 'Description 3', id: '3', status: 'DONE' },
    { title: 'Task 4', description: 'Description 4', id: '4', status: 'OPEN' },
  ]);

  constructor() {}

  tacksData = signal<Task[]>(this.initialData());

  addNewTask(title: string, description: string) {
    this.initialData.update((tasks) => [
      ...tasks,
      {
        title,
        description,
        id: Date.now().toString(),

        status: 'OPEN',
      },
    ]);

    this.tacksData.set(this.initialData());
  }

  filterTasks(filter: string) {
    if (filter === 'all') {
      this.tacksData.set(this.initialData());
    } else {
      this.tacksData.update(() =>
        this.initialData().filter((task) => task.status === filter)
      );
    }
  }

  changeTaskStatus(taskId: string, status: string) {
    this.tacksData.update((tasks) => {
      return tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: status as TaskStatus };
        }
        return task;
      });
    });
  }
}

// @Injectable({
//   providedIn: 'root',
// })
// export class TasksService {
//   initialData  = signal<Task[]>( [
//     { title: 'Task 1', description: 'Description 1', id: '1', status: 'OPEN' },
//     {
//       title: 'Task 2',
//       description: 'Description 2',
//       id: '2',
//       status: 'IN_PROGRESS',
//     },
//     { title: 'Task 3', description: 'Description 3', id: '3', status: 'DONE' },
//     { title: 'Task 4', description: 'Description 4', id: '4', status: 'OPEN' },
//   ]);

//   constructor() {}

//   tacksData: Task[] = [...this.initialData];

//   addNewTask(title: string, description: string) {
//     this.tacksData.push({
//       title,
//       description,
//       id: Date.now().toString(),
//       status: 'OPEN',
//     });
//   }

//   filterTasks(filter: string) {
//     if (filter === 'all') {
//       this.tacksData = this.initialData;
//     } else {
//       this.tacksData = this.initialData.filter(
//         (task) => task.status === filter
//       );
//     }
//   }

//   changeTaskStatus(taskId: string, status: string) {
//     this.tacksData.map((tack) => {
//       if (tack.id === taskId) {
//         return (tack.status = status as TaskStatus);
//       }
//       return;
//     });
//   }
// }
