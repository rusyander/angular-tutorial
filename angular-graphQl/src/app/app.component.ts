import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Graphql1Component } from './graphql1/graphql1.component';
import { GraphqlNEPOMNYASHIYComponent } from './graphql-nepomnyashiy/graphql-nepomnyashiy.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, Graphql1Component, GraphqlNEPOMNYASHIYComponent],
})
export class AppComponent {}
