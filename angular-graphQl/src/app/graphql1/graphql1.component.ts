import { Component, inject, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { COUNTRY, GET_COUNTRIES } from './graphql.operations';

interface PostsI {
  name: string;
  code: string;
  currency: string;
  continent: {
    name: string;
  };
}

interface CountryI {
  name: string;
  code: string;
  currency: string;
  phone: string;
  awsRegion: string;
}

@Component({
  selector: 'app-graphql1',
  standalone: true,
  imports: [],
  templateUrl: './graphql1.component.html',
  styleUrl: './graphql1.component.css',
})
export class Graphql1Component {
  apollo = inject(Apollo);

  posts = signal<PostsI[]>([]);
  country = signal<CountryI | null>(null);
  codeCountry = signal<string>('');

  loading = signal<boolean>(true);

  getCountry(val: string) {
    this.codeCountry.set(val);
    console.log('val', val);

    this.apollo
      .watchQuery<any>({
        query: COUNTRY,
        variables: {
          code: this.codeCountry(),
        },
      })
      .valueChanges.subscribe({
        next: (result) => {
          console.log(result?.data);
          this.country.set(result?.data?.country);
        },
        complete: () => {
          this.loading.set(false);
        },
        error: (error) => {
          console.log('there was an error sending the query', error);
        },
      });
  }

  constructor() {
    // apollo.query<any>({ query: POSTS }).subscribe({
    //   next: (result) => {
    //     console.log(result.data);
    //     this.posts.set(result.data.posts.data);
    //   },
    //   error: (error) => {
    //     console.log('there was an error sending the query', error);
    //   },
    // });

    // apollo.query<any>({ query: GET_COUNTRIES }).subscribe({
    //   next: (result) => {
    //     console.log(result?.data);
    //     this.posts.set(result?.data?.countries);
    //   },
    //   complete: () => {
    //     this.loading.set(false);
    //   },
    //   error: (error) => {
    //     console.log('there was an error sending the query', error);
    //   },
    // });

    this.apollo
      .watchQuery<any>({ query: GET_COUNTRIES })
      .valueChanges.subscribe({
        next: (result) => {
          console.log(result?.data);
          this.posts.set(result?.data?.countries);
        },
        complete: () => {
          this.loading.set(false);
        },
        error: (error) => {
          console.log('there was an error sending the query', error);
        },
      });
    console.log('this.codeCountry()', this.codeCountry());
  }
}
