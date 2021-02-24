import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageAdshowCompletionSourceComponent } from './average-adshow-completion-source.component';

describe('AverageAdshowCompletionSourceComponent', () => {
  let component: AverageAdshowCompletionSourceComponent;
  let fixture: ComponentFixture<AverageAdshowCompletionSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageAdshowCompletionSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageAdshowCompletionSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
