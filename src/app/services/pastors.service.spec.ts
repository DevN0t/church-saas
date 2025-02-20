import { TestBed } from '@angular/core/testing';

import { PastorsService } from './pastors.service';

describe('PastorsService', () => {
  let service: PastorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
