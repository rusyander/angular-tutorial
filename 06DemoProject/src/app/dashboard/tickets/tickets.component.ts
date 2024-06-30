import { Component } from '@angular/core';
import { TicketComponent } from './ticket/ticket.component';
import { NewTickerComponent } from './new-ticker/new-ticker.component';
import { TicketsServiceService } from './tickets-service.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
  imports: [TicketComponent, NewTickerComponent],
})
export class TicketsComponent {
  constructor(private ticketsServiceService: TicketsServiceService) {}

  get tickets() {
    return this.ticketsServiceService.tickets;
  }
}
