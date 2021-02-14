import { TestBed } from '@angular/core/testing';

import { SourceSinkService } from './source-sink.service';

describe('SourceSinkService', () => {
  let service: SourceSinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceSinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
