import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageBucksComponent } from './average-bucks.component';

describe('AverageBucksComponent', () => {
  let component: AverageBucksComponent;
  let fixture: ComponentFixture<AverageBucksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageBucksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageBucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
