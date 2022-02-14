import { createAction } from '@ngrx/store';
import { User } from '@favorite-movie/shared';

export const addUser = createAction('[User] Add User', (user: User) => ({
  user,
}));

export const updateUserInTheStore = createAction(
  '[User] Update In store',
  (user: User) => ({
    user,
  })
);
