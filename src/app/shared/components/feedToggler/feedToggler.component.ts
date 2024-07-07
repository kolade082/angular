import {Component, Input} from '@angular/core'
import {Store} from '@ngrx/store'
import {selectCurrentUser} from '../../../auth/store/reducers'
import {AsyncPipe, CommonModule, NgIf} from '@angular/common'
import {RouterLink, RouterLinkActive} from '@angular/router'

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feedToggler.component.html',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class FeedTogglerComponent {
  @Input() tagName?: string

  currentUser$ = this.store.select(selectCurrentUser)
  constructor(private store: Store) {
  }
}
