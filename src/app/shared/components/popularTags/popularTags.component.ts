import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {popularTagsActions} from './store/action'
import {combineLatest} from 'rxjs'
import {selectError, selectIsLoading, selectPopularTagsData} from './store/reducer'
import {CommonModule, NgIf} from '@angular/common'
import {LoadingComponent} from '../loading/loading.component'
import {ErrorMessageComponent} from '../errorMessage/errorMessage.component'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  imports: [
    NgIf,
    CommonModule,
    LoadingComponent,
    ErrorMessageComponent,
    RouterLink
  ],
  standalone: true
})
export class PopularTagsComponent implements OnInit {
  data$ = combineLatest({
    popularTags: this.store.select(selectPopularTagsData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
  })
  constructor(private store: Store) {
  }
  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags())
  }

}
