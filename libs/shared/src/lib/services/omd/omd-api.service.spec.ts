import { TestBed } from '@angular/core/testing';

import { OmdApiService } from 'libs/shared/src/lib/services/omd/omd-api.service';

describe('OmdApiService', () => {
  let service: OmdApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmdApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
