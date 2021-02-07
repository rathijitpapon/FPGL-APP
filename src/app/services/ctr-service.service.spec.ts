import { TestBed } from '@angular/core/testing';

import { CtrServiceService } from './ctr-service.service';

describe('CtrServiceService', () => {
  let service: CtrServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtrServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
