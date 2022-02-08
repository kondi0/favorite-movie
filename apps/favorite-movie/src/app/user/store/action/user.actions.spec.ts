import * as fromUser from './user.actions';

describe('loadUsers', () => {
  it('should return an action', () => {
    expect(fromUser.addUser({ name: '', country: '' }).type).toBe(
      '[User] Load Users'
    );
  });
});
