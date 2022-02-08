import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../action/user.actions';
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
    favoriteMovie: '',
  },
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.addUser, (state: UserState, { user }) => ({
    ...state,
    user: { ...user },
  }))
);

export function reducer(state: UserState | undefined, action: Action): any {
  return userReducer(state, action);
}
