import { TestBed } from '@angular/core/testing';

import { FirebaseDataServiceService } from './firebase-data-service.service';

describe('FirebaseDataServiceService', () => {
  let service: FirebaseDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
