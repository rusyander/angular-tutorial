import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graphql1Component } from './graphql1.component';

describe('Graphql1Component', () => {
  let component: Graphql1Component;
  let fixture: ComponentFixture<Graphql1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Graphql1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Graphql1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
