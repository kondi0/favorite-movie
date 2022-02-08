import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { UserState } from '../../store/reducer/user.reducer';
import { addUser } from '../../store/action/user.actions';
import { selectUser } from '../../store/selector/user.selectors';
import { User } from '@favorite-movie/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  constructor(private store: Store<UserState>, private router: Router) {}

  addUser(value: User) {
    this.store.dispatch(addUser(value));
    this.router.navigateByUrl('/user/thankyou');
    this.store.pipe(select(selectUser), take(1)).subscribe((value1) => {
      console.log(value1);
    });
  }
}
