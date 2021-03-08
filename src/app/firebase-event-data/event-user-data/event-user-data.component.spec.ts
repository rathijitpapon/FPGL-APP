import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUserDataComponent } from './event-user-data.component';

describe('EventUserDataComponent', () => {
  let component: EventUserDataComponent;
  let fixture: ComponentFixture<EventUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventUserDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
