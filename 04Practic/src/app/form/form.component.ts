import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Form } from './form.model';
import { InvestService } from '../invest.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  constructor(private investService: InvestService) {}

  initialInvestment = signal<number | null>(null);
  expectedReturn = signal<number | null>(null);
  annualInvestment = signal<number | null>(null);
  duration = signal<number | null>(null);

  onSubmit() {
    if (
      !this.initialInvestment ||
      !this.expectedReturn ||
      !this.annualInvestment ||
      !this.duration
    )
      return;
    const data: Form = {
      initialInvestment: this.initialInvestment()!,
      expectedReturn: this.expectedReturn()!,
      annualInvestment: this.annualInvestment()!,
      duration: this.duration()!,
    };

    this.investService.addNewInvestment(data);
    console.log('Form submitted');
  }
}
