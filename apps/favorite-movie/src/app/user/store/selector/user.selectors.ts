import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUser from '../reducer/user.reducer';

export const selectCustomerState = createFeatureSelector<fromUser.UserState>(
  fromUser.userFeatureKey
);

export const selectUser = createSelector(
  selectCustomerState,
  (state: fromUser.UserState) => state.user
);
