import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '@favorite-movie/shared';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Output()
  newUser: EventEmitter<User> = new EventEmitter<User>();

  userForm = this.formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')],
    ],
    username: ['', Validators.email],
    country: ['', Validators.required],
    postCode: [''],
    favoriteMovie: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userForm.get('country')?.valueChanges.subscribe((country: string) => {
      if (country === 'Ireland') {
        this.userForm.controls['postCode'].setValidators([
          Validators.min(6),
          Validators.max(10),
        ]);
      } else {
        this.userForm.controls['postCode'].setValidators([
          Validators.required,
          Validators.pattern(
            '^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$'
          ),
        ]);
      }
      this.userForm.controls['postCode'].updateValueAndValidity();
    });
  }

  save() {
    this.newUser.emit(this.userForm.getRawValue() as User);
  }

  gePostalCodeMessageError() {
    // @ts-ignore
    return JSON.stringify(this.userForm.get('postCode').errors);
  }
}
