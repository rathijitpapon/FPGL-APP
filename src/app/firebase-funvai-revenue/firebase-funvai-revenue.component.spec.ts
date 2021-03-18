import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseFunvaiRevenueComponent } from './firebase-funvai-revenue.component';

describe('FirebaseFunvaiRevenueComponent', () => {
  let component: FirebaseFunvaiRevenueComponent;
  let fixture: ComponentFixture<FirebaseFunvaiRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirebaseFunvaiRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseFunvaiRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
