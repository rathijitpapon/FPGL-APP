import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseEventDataComponent } from './firebase-event-data.component';

describe('FirebaseEventDataComponent', () => {
  let component: FirebaseEventDataComponent;
  let fixture: ComponentFixture<FirebaseEventDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirebaseEventDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseEventDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
