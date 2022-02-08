import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '@favorite-movie/shared';
import { Countries } from '../../models/user-form/countries.enum';
import {
  ukPostCodePattern,
  userNamePattern,
} from 'libs/shared/src/lib/constants/form-patterns';
import { ErrorMessagesService } from 'libs/shared/src/lib/services/error-messages/error-messages.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Output()
  newUser: EventEmitter<User> = new EventEmitter<User>();

  countries: typeof Countries = Countries;
  countriesList: string[] = Object.keys(this.countries);

  userForm = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.pattern(userNamePattern)]],
      username: ['', Validators.email],
      country: ['', Validators.required],
      postCode: [null],
      favoriteMovie: [''],
    },
    { updateOn: 'submit' }
  );

  constructor(
    private formBuilder: FormBuilder,
    private errorMessagesService: ErrorMessagesService
  ) {}

  private readonly irishPostCodeValidators = [
    Validators.minLength(6),
    Validators.maxLength(10),
  ];

  private readonly ukPostCodeValidators = [
    Validators.required,
    Validators.pattern(ukPostCodePattern),
  ];

  ngOnInit(): void {
    this.keepPostCodeValidatorsUpdated();
  }

  save() {
    if (this.userForm.valid) {
      this.newUser.emit(this.userForm.getRawValue() as User);
    }
  }

  getErrorMessage(errors) {
    return this.errorMessagesService.getErrorMessage(errors);
  }

  private keepPostCodeValidatorsUpdated() {
    this.userForm.controls['country'].valueChanges.subscribe(
      (country: Countries) => {
        this.userForm.controls['postCode'].setValidators(
          Countries.IR === country
            ? this.irishPostCodeValidators
            : this.ukPostCodeValidators
        );
        this.userForm.controls['postCode'].updateValueAndValidity();
      }
    );
  }
}
