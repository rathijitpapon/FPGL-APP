import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucksSpendAndEarningComponent } from './bucks-spend-and-earning.component';

describe('BucksSpendAndEarningComponent', () => {
  let component: BucksSpendAndEarningComponent;
  let fixture: ComponentFixture<BucksSpendAndEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BucksSpendAndEarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BucksSpendAndEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
