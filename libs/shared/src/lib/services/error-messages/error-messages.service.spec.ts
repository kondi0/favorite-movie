import { TestBed } from '@angular/core/testing';

import { ErrorMessagesService } from 'libs/shared/src/lib/services/error-messages/error-messages.service';

describe('ErrorMessagesService', () => {
  let service: ErrorMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
