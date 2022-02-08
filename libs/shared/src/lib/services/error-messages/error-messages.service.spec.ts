import { TestBed } from '@angular/core/testing';

import { ErrorMessagesService } from 'libs/shared/src/lib/services/error-messages/error-messages.service';
import {
  ukPostCodePattern,
  userNamePattern,
} from 'libs/shared/src/lib/constants/form-patterns';

describe('ErrorMessagesService', () => {
  let service: ErrorMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return min length message', () => {
    expect(service.getErrorMessage({ minlength: '2' })).toBe('Too short text');
  });

  it('should return max length message', () => {
    expect(service.getErrorMessage({ maxLength: '2' })).toBe('Too long text');
  });

  it('should return required message', () => {
    expect(service.getErrorMessage({ required: true })).toBe('Required field');
  });

  it('should return email message', () => {
    expect(service.getErrorMessage({ email: true })).toBe(
      'Invalid email address'
    );
  });

  it('should return invalid post code for the uk message', () => {
    expect(
      service.getErrorMessage({
        pattern: { requiredPattern: ukPostCodePattern },
      })
    ).toBe('Invalid post code for the UK');
  });

  it('should return invalid name message', () => {
    expect(
      service.getErrorMessage({ pattern: { requiredPattern: userNamePattern } })
    ).toBe('The name can not contain numbers');
  });

  it('should return default error message', () => {
    expect(service.getErrorMessage({ other: true })).toBe('Invalid field');
  });
});
