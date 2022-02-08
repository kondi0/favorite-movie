import { createAction } from '@ngrx/store';
import { User } from '@favorite-movie/shared';

export const addUser = createAction('[User] Load Users', (user: User) => ({
  user,
}));
