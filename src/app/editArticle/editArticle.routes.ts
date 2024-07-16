import { Routes } from '@angular/router';
import { EditArticleComponent } from './components/editArticle/editArticle.component';
import { EditArticleService } from './services/editArticle.service';
import { EditArticleEffects } from './store/effects';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { editArticleFeatureKey, editArticleReducer } from './store/reducers';

export const routes: Routes = [
  {
    path: '',
    component: EditArticleComponent,
    providers: [
      EditArticleService,
      provideEffects(EditArticleEffects),
      provideState(editArticleFeatureKey, editArticleReducer)
    ]
  }
];
