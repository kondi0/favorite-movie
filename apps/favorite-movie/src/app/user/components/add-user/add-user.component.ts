import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../store/reducer/user.reducer';
import { addUser } from '../../store/action/user.actions';
import { User } from '@favorite-movie/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  constructor(private store: Store<UserState>, private router: Router) {}

  addUser(value: User): void {
    this.store.dispatch(addUser(value));
    this.router.navigateByUrl('/user/thankyou');
  }
}
