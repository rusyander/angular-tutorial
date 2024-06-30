import { Component, input, signal } from '@angular/core';
import { Ticket } from '../tickets.model';
import { TicketsServiceService } from '../tickets-service.service';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  ticket = input<Ticket>();

  detailVisible = signal<boolean>(false);

  constructor(private ticketsServiceService: TicketsServiceService) {}

  onToggleDetails() {
    this.detailVisible.update((visible) => !visible);
  }

  onTicketComplited(id: number) {
    this.ticketsServiceService.onCloseTisket(id);
  }
}
