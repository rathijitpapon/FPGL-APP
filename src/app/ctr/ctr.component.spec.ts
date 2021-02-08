import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrComponent } from './ctr.component';

describe('CtrComponent', () => {
  let component: CtrComponent;
  let fixture: ComponentFixture<CtrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
