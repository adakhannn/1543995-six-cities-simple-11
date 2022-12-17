import {makeFakeUserData} from '../../utils/mocks';
import {UserProcess} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import {userProcess} from './user-process';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';

const userInfo = makeFakeUserData();

describe('Reducer: userProcess', () => {
  let initialState: UserProcess;

  beforeEach(() => {
    initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" and set userInfo if checkAuthAction fulfilled', () => {
      expect(
        userProcess.reducer(initialState, {
          type: checkAuthAction.fulfilled.type,
          payload: userInfo,
        })
      ).toEqual({ authorizationStatus: AuthorizationStatus.Auth, userInfo });
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(
        userProcess.reducer(initialState, { type: checkAuthAction.rejected.type, userInfo: null })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      });
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" and set userData if loginAction fulfilled', () => {
      expect(
        userProcess.reducer(initialState, { type: loginAction.fulfilled.type, payload: userInfo })
      ).toEqual({ authorizationStatus: AuthorizationStatus.Auth, userInfo });
    });

    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(
        userProcess.reducer(initialState, { type: loginAction.rejected.type })
      ).toEqual({ authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null });
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(
        userProcess.reducer(initialState, { type: logoutAction.fulfilled.type })
      ).toEqual({ authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null });
    });
  });
});
