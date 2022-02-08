import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UserState } from 'apps/favorite-movie/src/app/user/store/reducer/user.reducer';
import { User } from '@favorite-movie/shared';
import { selectUser } from 'apps/favorite-movie/src/app/user/store/selector/user.selectors';
import { take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit {
  user: Observable<User> = of({ name: '', country: '' });
  constructor(private store: Store<UserState>) {}

  ngOnInit(): void {
    this.user = this.store.pipe(select(selectUser), take(1));
  }
}
