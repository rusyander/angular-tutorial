import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';
import { LogoComponent } from './logo/logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [FormComponent, InvestmentResultsComponent, LogoComponent],
})
export class AppComponent {}
