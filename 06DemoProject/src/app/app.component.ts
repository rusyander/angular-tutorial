import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';

import { TicketsComponent } from './dashboard/tickets/tickets.component';
import { ServerStatusComponent } from './dashboard/server-status.component/server-status.component';
import { TrafficComponent } from './dashboard/traffic/traffic.component';
import { DashboardItemComponent } from './dashboard/dashboard-item/dashboard-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    HeaderComponent,
    TicketsComponent,
    ServerStatusComponent,
    TrafficComponent,
    DashboardItemComponent,
  ],
})
export class AppComponent {}
