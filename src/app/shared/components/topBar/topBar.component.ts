import {Component} from '@angular/core'
import {combineLatest} from 'rxjs'
import {selectCurrentUser} from '../../../auth/store/reducers'
import {Store} from '@ngrx/store'
import {AsyncPipe, CommonModule, NgIf} from '@angular/common'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'mc-topbar',
  templateUrl: './topBar.component.html',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    AsyncPipe,
    CommonModule
  ]
})
export class TopBarComponent {
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  })
  constructor(private store: Store) {
  }
}
