import { Routes } from '@angular/router';

import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import {
  NewTaskComponent,
  canLeaveEditPage,
} from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    component: TasksComponent, // default loading
    // loadComponent: () =>
    //   import('../tasks/tasks.component').then((m) => m.TasksComponent), // Lazy loading
    runGuardsAndResolvers: 'always', //  это свойство указывает на то, что при каждой навигации к этому маршруту должны быть запущены все охранники и резолверы
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage],
  },
];
