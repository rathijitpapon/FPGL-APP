import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageAdshowSourceComponent } from './average-adshow-source.component';

describe('AverageAdshowSourceComponent', () => {
  let component: AverageAdshowSourceComponent;
  let fixture: ComponentFixture<AverageAdshowSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageAdshowSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageAdshowSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
