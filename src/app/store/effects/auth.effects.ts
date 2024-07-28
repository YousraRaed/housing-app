import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import * as AuthActions from '../actions/auth.action';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action).pipe(
          map((response) => {
            if (response.error) {
              return AuthActions.loginFailure({
                error: 'Invalid username or password',
              });
            } else {
              const token = response.data.attributes.token;
              localStorage.setItem('authToken', token);
              return AuthActions.loginSuccess();
            }
          }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('authToken');
        })
      ),
    { dispatch: false }
  );
}
