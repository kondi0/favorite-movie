import {
  reducer,
  initialState,
} from 'apps/favorite-movie/src/app/modules/user/store/reducer/user.reducer';

describe('User Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
