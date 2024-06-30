import { Injectable } from '@angular/core';
import { Ticket } from './tickets.model';

@Injectable({
  providedIn: 'root',
})
export class TicketsServiceService {
  tickets: Ticket[] = [
    {
      id: 1,
      title: 'Ticket 1',
      request: 'Request 1',
      status: 'open',
    },

    {
      id: 2,
      title: 'Ticket 2',
      request: 'Request 2',
      status: 'closed',
    },
  ];
  constructor() {}

  addNewTicket(ticket: Omit<Ticket, 'id'>) {
    const id = Date.now();
    this.tickets.push({ ...ticket, id });
  }

  onCloseTisket(id: number) {
    const ticket = this.tickets.find((ticket) => ticket.id === id);
    if (ticket) {
      ticket.status = 'closed';
    }
  }
}
