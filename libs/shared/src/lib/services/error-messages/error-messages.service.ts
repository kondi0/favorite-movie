import { Injectable } from '@angular/core';
import { ukPostCodePattern } from 'libs/shared/src/lib/constants/form-patterns';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessagesService {
  // Translations handling can be added if required
  private readonly errorsMap: Map<string, (errors) => string> = new Map<
    string,
    (errors) => string
  >([
    ['minlength', () => 'Too short text'],
    ['maxLength', () => 'Too long text'],
    ['required', () => 'Required field'],
    ['email', () => 'Invalid email address'],
    [
      'pattern',
      (errors) => {
        // Patterns control can be improved if in the future there are more patterns
        return errors.pattern.requiredPattern === ukPostCodePattern
          ? 'Invalid post code for the UK'
          : 'The name can not contain numbers';
      },
    ],
  ]);

  constructor() {}

  getErrorMessage(errors): string {
    const errorMessage = this.errorsMap.get(Object.keys(errors)[0]);
    return errorMessage ? errorMessage(errors) : 'Invalid field';
  }
}
