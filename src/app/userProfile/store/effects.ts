import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators'
import { of } from 'rxjs';
import {Router} from '@angular/router'
import {UserProfileService} from '../services/userProfile.service'
import {userProfileActions} from './actions'
import {UserProfileInterface} from '../types/userProfile.interface'

@Injectable()
export class UserProfileEffects {
  constructor(
    private actions$: Actions,
    private userProfileService: UserProfileService,
    private router: Router
  ) {}

  getUserProfileEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      switchMap(({ slug }) => {
        return this.userProfileService.getUserProfile(slug).pipe(
          map((userProfile: UserProfileInterface) => {
            return userProfileActions.getUserProfileSuccess({ userProfile });
          }),
          catchError(() => {
            return of(userProfileActions.getUserProfileFailure())
          })
        );
      })
    )
  );
}
