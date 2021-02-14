import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucksStatusComponent } from './bucks-status.component';

describe('BucksStatusComponent', () => {
  let component: BucksStatusComponent;
  let fixture: ComponentFixture<BucksStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BucksStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BucksStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
