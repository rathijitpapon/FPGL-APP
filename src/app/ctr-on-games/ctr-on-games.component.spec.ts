import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrOnGamesComponent } from './ctr-on-games.component';

describe('CtrOnGamesComponent', () => {
  let component: CtrOnGamesComponent;
  let fixture: ComponentFixture<CtrOnGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtrOnGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrOnGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
