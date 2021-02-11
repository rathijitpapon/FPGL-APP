import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrWithRespectToSourceComponent } from './ctr-with-respect-to-source.component';

describe('CtrWithRespectToSourceComponent', () => {
  let component: CtrWithRespectToSourceComponent;
  let fixture: ComponentFixture<CtrWithRespectToSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtrWithRespectToSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrWithRespectToSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
