import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class DashboardItemComponent {
  title = input<string>();
  image = input<string>();
  altTextImage = input<string>();
}
