import { TestBed } from '@angular/core/testing';

import { FirebaseIphoneDataServiceService } from './firebase-iphone-data-service.service';

describe('FirebaseIphoneDataServiceService', () => {
  let service: FirebaseIphoneDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseIphoneDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
