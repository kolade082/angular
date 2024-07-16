import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators'
import { of } from 'rxjs';
import {ArticleService as SharedArticleService} from '../../shared/services/article.service'
import {articleActions} from './action'
import {ArticleInterface} from '../../shared/types/article.interface'
import {ArticleService} from '../services/article.service'
import {Router} from '@angular/router'

@Injectable() // Add the Injectable decorator
export class ArticleEffects {
  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService,
    private articleService: ArticleService,
    private router: Router
  ) {}

  getArticleEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap(({ slug }) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return articleActions.getArticleSuccess({ article });
          }),
          catchError(() => of(articleActions.getArticleFailure()))
        );
      })
    )
  );

  deleteArticleEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(articleActions.deleteArticle),
      switchMap(({ slug }) => {
        return this.articleService.deleteArticle(slug).pipe(
          map(() => {
            return articleActions.deleteArticleSuccess();
          }),
          catchError(() => of(articleActions.deleteArticleFailure()))
        );
      })
    )
  );

  redirectAfterDeleteEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(articleActions.deleteArticleSuccess),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
}
