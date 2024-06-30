import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTickerComponent } from './new-ticker.component';

describe('NewTickerComponent', () => {
  let component: NewTickerComponent;
  let fixture: ComponentFixture<NewTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
