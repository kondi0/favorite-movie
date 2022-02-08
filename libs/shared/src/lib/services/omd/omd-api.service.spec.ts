import { TestBed } from '@angular/core/testing';

import { OmdApiService } from 'libs/shared/src/lib/services/omd/omd-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'apps/favorite-movie/src/environments/environment';

describe('OmdApiService', () => {
  let service: OmdApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'omdapiUrl',
          useValue: environment.omdapi,
        },
        {
          provide: 'omdapiUrl_apikey',
          useValue: environment.omdapi_apikey,
        },
      ],
    });
    service = TestBed.inject(OmdApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
