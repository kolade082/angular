import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {PopularTagService} from '../services/popularTag.service'
import {popularTagsActions} from './action'
import {PopularTagType} from '../../../types/popularTag.type'

@Injectable() // Add the Injectable decorator
export class PopularTagsEffects {
  constructor(
    private actions$: Actions,
    private popularTagService: PopularTagService
  ) {}

  getPopularTagsEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap(() => {
        return this.popularTagService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return popularTagsActions.getPopularTagsSuccess({ popularTags });
          }),
          catchError(() => of(popularTagsActions.getPopularTagsFailure()))
        );
      })
    )
  );
}
