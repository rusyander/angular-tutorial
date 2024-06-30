import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  // selector: 'app-button',
  selector: 'button[appButton], a[appButton]',

  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  // text = input.required<string>();
  // icon = input<string>();
}
