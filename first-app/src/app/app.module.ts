import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MyCalcComponent } from './my-calc/my-calc.component';

@NgModule({
  declarations: [
    // AppComponent,
    // MyNavigation,
    // MyEmptyPage,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MyCalcComponent,
    // AppRoutingModule,
    // MyCalculatorModule,
  ],
  providers: [],
  //   bootstrap: [AppComponent],
})
export class AppModule {}
