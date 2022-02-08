import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UserState } from 'apps/favorite-movie/src/app/modules/user/store/reducer/user.reducer';
import { User } from '@favorite-movie/shared';
import { selectUser } from 'apps/favorite-movie/src/app/modules/user/store/selector/user.selectors';
import { take, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit, OnDestroy {
  user: User = {
    name: '',
    country: '',
    username: '',
    postCode: '',
    favoriteMovie: '',
  };

  objectKeys = Object.keys;
  destroyed: Subject<void> = new Subject<void>();

  constructor(private store: Store<UserState>) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectUser), take(1), takeUntil(this.destroyed))
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
