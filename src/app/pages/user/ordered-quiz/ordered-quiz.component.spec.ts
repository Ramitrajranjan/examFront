import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedQuizComponent } from './ordered-quiz.component';

describe('OrderedQuizComponent', () => {
  let component: OrderedQuizComponent;
  let fixture: ComponentFixture<OrderedQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderedQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
