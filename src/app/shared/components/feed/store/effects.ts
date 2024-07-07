import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FeedService } from '../services/feed.service';
import { feedActions } from './actions';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';

@Injectable() // Add the Injectable decorator
export class FeedEffects {
  constructor(
    private actions$: Actions,
    private feedService: FeedService
  ) {}

  getFeedEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({ url }) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return feedActions.getFeedSuccess({ feed });
          }),
          catchError(() => of(feedActions.getFeedFailure()))
        );
      })
    )
  );
}
