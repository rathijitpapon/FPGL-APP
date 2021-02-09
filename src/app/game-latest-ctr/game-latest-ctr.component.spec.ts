import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLatestCtrComponent } from './game-latest-ctr.component';

describe('GameLatestCtrComponent', () => {
  let component: GameLatestCtrComponent;
  let fixture: ComponentFixture<GameLatestCtrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameLatestCtrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLatestCtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
