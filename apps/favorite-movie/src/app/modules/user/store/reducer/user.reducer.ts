import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from 'apps/favorite-movie/src/app/modules/user/store/action/user.actions';
import { User } from '@favorite-movie/shared';

export const userFeatureKey = 'user';

export interface UserState {
  user: User;
}

export const initialState: UserState = {
  user: {
    name: '',
    country: '',
    username: '',
    postCode: '',
    favoriteMovie: { imdbID: '' },
  },
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.updateUserInTheStore, (state: UserState, { user }) => ({
    ...state,
    user: { ...user },
  }))
);

export function reducer(state: UserState | undefined, action: Action): any {
  return userReducer(state, action);
}
