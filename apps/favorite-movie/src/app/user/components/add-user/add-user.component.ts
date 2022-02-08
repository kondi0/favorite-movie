import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { UserState } from '../../store/reducer/user.reducer';
import { addUser } from '../../store/action/user.actions';
import { selectUser } from '../../store/selector/user.selectors';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
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

  constructor(
    private store: Store<UserState>,
    private formBuilder: FormBuilder
  ) {}

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

  addCustomer(value: string) {
    this.store.dispatch(addUser({ name: value }));
    this.store.pipe(select(selectUser), take(1)).subscribe((value1) => {
      console.log(value1);
    });
  }

  gePostalCodeMessageError() {
    // @ts-ignore
    return JSON.stringify(this.userForm.get('postCode').errors);
  }
}
