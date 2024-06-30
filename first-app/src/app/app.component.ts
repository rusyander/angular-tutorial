import { Component, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MyCalcComponent } from './my-calc/my-calc.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, MyCalcComponent],
})
export class AppComponent {
  title = 'first-app';
  list = ['Angular', 'React', 'Vue'];
  tooltip = 'my tooltip';

  createForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });
}
