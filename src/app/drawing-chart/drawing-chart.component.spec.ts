import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingChartComponent } from './drawing-chart.component';

describe('DrawingChartComponent', () => {
  let component: DrawingChartComponent;
  let fixture: ComponentFixture<DrawingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawingChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
