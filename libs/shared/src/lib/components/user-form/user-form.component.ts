import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '@favorite-movie/shared';
import { Countries } from '../../models/user-form/countries.enum';

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
      name: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')],
      ],
      username: ['', Validators.email],
      country: ['', Validators.required],
      postCode: [''],
      favoriteMovie: [''],
    },
    { updateOn: 'submit' }
  );

  constructor(private formBuilder: FormBuilder) {}

  private readonly irishPostCodeValidators = [
    Validators.minLength(6),
    Validators.maxLength(10),
  ];

  private readonly ukPostCodeValidators = [
    Validators.required,
    Validators.pattern(
      '^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$'
    ),
  ];

  ngOnInit(): void {
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

  save() {
    if (this.userForm.valid) {
      this.newUser.emit(this.userForm.getRawValue() as User);
    }
  }

  gePostalCodeMessageError() {
    // @ts-ignore
    return JSON.stringify(this.userForm.get('postCode').errors);
  }
}
