import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators'
import { of } from 'rxjs';
import {ArticleInterface} from '../../shared/types/article.interface'
import {Router} from '@angular/router'
import {CreateArticleService} from '../services/createArticle.service'
import {createArticleActions} from './actions'
import {HttpErrorResponse} from '@angular/common/http'

@Injectable() // Add the Injectable decorator
export class CreateArticleEffects {
  constructor(
    private actions$: Actions,
    private createArticleService: CreateArticleService,
    private router: Router
  ) {}

  createArticleEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleActions.createArticle),
      switchMap(({ request }) => {
        return this.createArticleService.createArticle(request).pipe(
          map((article: ArticleInterface) => {
            return createArticleActions.createArticleSuccess({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              createArticleActions.createArticleFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        );
      })
    )
  );


  redirectAfterCreateEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleActions.createArticleSuccess),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    { dispatch: false }
  );

}
