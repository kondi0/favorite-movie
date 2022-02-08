import * as fromUser from 'apps/favorite-movie/src/app/modules/user/store/action/user.actions';

describe('loadUsers', () => {
  it('should return an action', () => {
    expect(fromUser.addUser({ name: '', country: '' }).type).toBe(
      '[User] Load Users'
    );
  });
});
