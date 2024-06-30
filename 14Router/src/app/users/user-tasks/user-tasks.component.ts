import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  title = input();
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroy = inject(DestroyRef);
  userName = input();

  ngOnInit(): void {
    const getIdSuv = this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        // console.log(params.get('userId'));
      },
    });

    this.destroy.onDestroy(() => {
      getIdSuv.unsubscribe();
    });
  }

  currentUser = computed(() => {
    return this.usersService.users.find((user) => user.id === this.userId());
  });
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (user) => user.id === activatedRoute.paramMap.get('userId')
    )?.name || '';

  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => resolveUserName(activatedRoute, routerState) + "'s Tasks";
