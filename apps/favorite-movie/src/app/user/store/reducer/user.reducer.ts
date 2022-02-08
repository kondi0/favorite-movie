import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../action/user.actions';
import { User } from '../../../models/user';

export const userFeatureKey = 'user';

export interface UserState {
  user: User | undefined;
}

export const initialState: UserState = {
  user: undefined,
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
