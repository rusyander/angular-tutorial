import { Injectable } from '@angular/core';
import { Form } from './form/form.model';
import { InvestResult } from './investResult.model';

@Injectable({ providedIn: 'root' })
export class InvestService {
  dataInvests: InvestResult[] = [
    {
      id: '1',
      year: 1,
      interest: 1000,
      valueEndOfYear: 100,
      annualInvestment: 1000,
      totalInterest: 2100,
      totalAmountInvested: 10000,
    },
    {
      id: '2',
      year: 2,
      interest: 2000,
      valueEndOfYear: 200,
      annualInvestment: 2000,
      totalInterest: 2200,
      totalAmountInvested: 20000,
    },
    {
      id: '3',
      year: 3,
      interest: 3000,
      valueEndOfYear: 300,
      annualInvestment: 3000,
      totalInterest: 2300,
      totalAmountInvested: 30000,
    },
    {
      id: '4',
      year: 4,
      interest: 4000,
      valueEndOfYear: 400,
      annualInvestment: 4000,
      totalInterest: 2400,
      totalAmountInvested: 40000,
    },
    {
      id: '5',
      year: 5,
      interest: 5000,
      valueEndOfYear: 500,
      annualInvestment: 5000,
      totalInterest: 2500,
      totalAmountInvested: 50000,
    },
  ];

  addNewInvestment(data: Form) {
    const { initialInvestment, expectedReturn, annualInvestment, duration } =
      data;
    const annualData: InvestResult[] = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
        id: Date.now().toString(),
      });
    }

    this.dataInvests.push(...annualData);
  }
}
