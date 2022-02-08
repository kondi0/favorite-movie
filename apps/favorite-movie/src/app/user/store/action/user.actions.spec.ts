import * as fromUser from './user.actions';

describe('loadUsers', () => {
  it('should return an action', () => {
    expect(fromUser.addUser().type).toBe('[User] Load Users');
  });
});
