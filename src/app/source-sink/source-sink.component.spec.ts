import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceSinkComponent } from './source-sink.component';

describe('SourceSinkComponent', () => {
  let component: SourceSinkComponent;
  let fixture: ComponentFixture<SourceSinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceSinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceSinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
