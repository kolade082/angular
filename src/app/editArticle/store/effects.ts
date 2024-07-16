import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators'
import { of } from 'rxjs';
import {ArticleInterface} from '../../shared/types/article.interface'
import {Router} from '@angular/router'
import {ArticleService as SharedArticleService} from '../../shared/services/article.service'
import {EditArticleService} from '../services/editArticle.service'
import {editArticleActions} from './actions'
import {HttpErrorResponse} from '@angular/common/http'

@Injectable() // Add the Injectable decorator
export class EditArticleEffects {
  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService,
    private editArticleService: EditArticleService,
    private router: Router
  ) {}

  getArticleEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(editArticleActions.getArticle),
      switchMap(({ slug }) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return editArticleActions.getArticleSuccess({ article });
          }),
          catchError(() => of(editArticleActions.getArticleFailure()))
        );
      })
    )
  );

  updateArticleEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(editArticleActions.updateArticle),
      switchMap(({ request, slug }) => {
        return this.editArticleService.updateArticle(slug, request).pipe(
          map((article: ArticleInterface) => {
            return editArticleActions.updateArticleSuccess({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              editArticleActions.updateArticleFailure({
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
        ofType(editArticleActions.updateArticleSuccess),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    { dispatch: false }
  );

}
