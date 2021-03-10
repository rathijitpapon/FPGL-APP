import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IphoneEventDataComponent } from './iphone-event-data.component';

describe('IphoneEventDataComponent', () => {
  let component: IphoneEventDataComponent;
  let fixture: ComponentFixture<IphoneEventDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IphoneEventDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IphoneEventDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
