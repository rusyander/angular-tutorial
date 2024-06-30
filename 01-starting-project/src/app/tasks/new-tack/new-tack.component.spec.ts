import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTackComponent } from './new-tack.component';

describe('NewTackComponent', () => {
  let component: NewTackComponent;
  let fixture: ComponentFixture<NewTackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
