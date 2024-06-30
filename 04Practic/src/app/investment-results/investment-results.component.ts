import { Component } from '@angular/core';
import { InvestService } from '../invest.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  constructor(private investService: InvestService) {}

  get dataInvests() {
    return this.investService.dataInvests;
  }
}
