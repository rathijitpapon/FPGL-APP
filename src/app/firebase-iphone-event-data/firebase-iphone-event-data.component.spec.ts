import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseIphoneEventDataComponent } from './firebase-iphone-event-data.component';

describe('FirebaseIphoneEventDataComponent', () => {
  let component: FirebaseIphoneEventDataComponent;
  let fixture: ComponentFixture<FirebaseIphoneEventDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirebaseIphoneEventDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseIphoneEventDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
