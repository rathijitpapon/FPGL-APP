import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCompletionComponent } from './ad-completion.component';

describe('AdCompletionComponent', () => {
  let component: AdCompletionComponent;
  let fixture: ComponentFixture<AdCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdCompletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
