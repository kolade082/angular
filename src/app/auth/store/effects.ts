import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthService } from '../services/auth.service';
import { authActions } from './actions';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from '../../shared/services/persistance.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}

  getCurrentUserEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const token = this.persistanceService.get('accessToken');

        if (!token) {
          return of(authActions.getCurrentUserFailure());
        }

        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.getCurrentUserSuccess({ currentUser });
          }),
          catchError(() => of(authActions.getCurrentUserFailure()))
        );
      })
    )
  );

  registerEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) =>
        this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);
            return authActions.registerSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(authActions.registerFailure({ errors: errorResponse.error.errors }))
          )
        )
      )
    )
  );

  redirectAfterRegisterEffect = createEffect(() =>
      this.actions$.pipe(
        ofType(authActions.registerSuccess),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false } // Specify that this effect does not dispatch any actions
  );

  loginEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) =>
        this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);
            return authActions.loginSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(authActions.loginFailure({ errors: errorResponse.error.errors }))
          )
        )
      )
    )
  );

  redirectAfterLoginEffect = createEffect(() =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  updateCurrentUserEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.updateCurrentUser),
      switchMap(({currentUserRequest}) => {

        return this.authService.updateCurrentUser(currentUserRequest).pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.updateCurrentUserSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => of(authActions.updateCurrentUserFailure({
            errors: errorResponse.error.errors,
          })))
        );
      })
    )
  );

  logoutEffect = createEffect(() =>
      this.actions$.pipe(
        ofType(authActions.logout),
        tap(() => {
          this.persistanceService.set('accessToken', ''); // Clear the token
          this.router.navigateByUrl('/'); // Navigate to the login page
        })
      ),
    { dispatch: false }
  );
}
