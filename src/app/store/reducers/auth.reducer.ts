import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';

export interface AuthState {
  isAuthenticated: boolean;
  error: any;
}

export const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('authToken'),
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    isAuthenticated: true,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    error,
  })),
  on(AuthActions.logout, (state) => {
    localStorage.removeItem('authToken');
    return {
      ...state,
      isAuthenticated: false,
      error: null,
    };
  }),
  on(AuthActions.initializeAuth, (state) => ({
    ...state,
    isAuthenticated: !!localStorage.getItem('authToken'),
  }))
);
