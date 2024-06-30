import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  AddTodos,
  AllTodos,
  DeleteTodos,
  UpdateTodos,
} from './graphql.operations';
import { debounceTime } from 'rxjs';

interface Todos {
  id: string;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-graphql-nepomnyashiy',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './graphql-nepomnyashiy.component.html',
  styleUrl: './graphql-nepomnyashiy.component.css',
})
export class GraphqlNEPOMNYASHIYComponent implements OnInit {
  apollo = inject(Apollo);

  title = signal<string>('');
  searchModel = signal<string>('');

  loading = signal<boolean>(true);
  todosData = signal<Todos[]>([]);

  form = new FormGroup({
    search: new FormControl(''),
  });

  onSearch() {
    // поиск по введенному значению
    if (!this.form.valid) return;
    this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        this.apollo
          .query<{ todos: { data: Todos[] } }>({
            query: AllTodos,
            variables: {
              options: {
                search: {
                  q: value,
                },
              },
            },
          })
          .subscribe({
            next: (result) => {
              this.todosData.set(result?.data?.todos.data);
              console.log(result?.data);
            },
            complete: () => {
              this.loading.set(false);
              console.log('completed');
            },
            error: (error) => {
              console.log('there was an error sending the query', error);
            },
          });
      },
    });
  }

  ngOnInit(): void {
    this.getTack();
  }

  getTack() {
    this.apollo
      .query<{ todos: { data: Todos[] } }>({
        query: AllTodos,
        variables: {
          options: {
            paginate: {
              page: 1,
              limit: 30,
            },
          },
        },
      })
      .subscribe({
        next: (result) => {
          this.todosData.set(result?.data?.todos.data);
          console.log(result?.data);
        },
        complete: () => {
          this.loading.set(false);
          console.log('completed');
        },
        error: (error) => {
          console.log('there was an error sending the query', error);
        },
      });
  }

  addTack() {
    if (!this.title()) return;

    this.apollo
      .mutate({
        mutation: AddTodos,
        variables: {
          input: {
            title: this.title(),
            completed: false,
          },
        },
      })
      .subscribe({
        next: (result) => {
          console.log(result);
          this.getTack();
          this.title.set('');
        },
        complete: () => {
          this.loading.set(false);
          console.log('completed');
        },
        error: (error) => {
          console.log('there was an error sending the query', error);
        },
      });
  }

  search() {
    if (!this.searchModel()) return;

    this.apollo
      .query<{ todos: { data: Todos[] } }>({
        query: AllTodos,
        variables: {
          options: {
            search: {
              q: this.searchModel(),
            },
          },
        },
      })
      .subscribe({
        next: (result) => {
          this.todosData.set(result?.data?.todos.data);
          console.log(result?.data);
        },
        complete: () => {
          this.loading.set(false);
          console.log('completed');
          this.searchModel.set('');
        },
        error: (error) => {
          console.log('there was an error sending the query', error);
        },
      });
  }

  deleteTodos(id: string) {
    this.apollo.mutate({ mutation: DeleteTodos, variables: { id } }).subscribe({
      next: (result) => {
        console.log(result);
      },
      complete: () => {
        this.getTack();
      },
      error: (error) => {
        console.log('there was an error sending the query', error);
      },
    });
  }

  updateTodos(id: string, completed: boolean) {
    this.apollo
      .mutate({
        mutation: UpdateTodos,
        variables: {
          id,
          input: {
            completed: !completed,
          },
        },
      })
      .subscribe({
        next: (result) => {
          console.log(result);
          this.getTack();
        },
        complete: () => {
          this.loading.set(false);
          console.log('completed');
        },
        error: (error) => {
          console.log('there was an error sending the query', error);
        },
      });
  }
}
