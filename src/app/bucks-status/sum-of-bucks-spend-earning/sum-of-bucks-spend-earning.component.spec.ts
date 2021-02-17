import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumOfBucksSpendEarningComponent } from './sum-of-bucks-spend-earning.component';

describe('SumOfBucksSpendEarningComponent', () => {
  let component: SumOfBucksSpendEarningComponent;
  let fixture: ComponentFixture<SumOfBucksSpendEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumOfBucksSpendEarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SumOfBucksSpendEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
