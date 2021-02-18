import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageCumulativeBucksComponent } from './average-cumulative-bucks.component';

describe('AverageCumulativeBucksComponent', () => {
  let component: AverageCumulativeBucksComponent;
  let fixture: ComponentFixture<AverageCumulativeBucksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageCumulativeBucksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageCumulativeBucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
