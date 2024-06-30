import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqlNEPOMNYASHIYComponent } from './graphql-nepomnyashiy.component';

describe('GraphqlNEPOMNYASHIYComponent', () => {
  let component: GraphqlNEPOMNYASHIYComponent;
  let fixture: ComponentFixture<GraphqlNEPOMNYASHIYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphqlNEPOMNYASHIYComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphqlNEPOMNYASHIYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
