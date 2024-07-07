import {Component, OnInit} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {TopBarComponent} from './shared/components/topBar/topBar.component'
import {authActions} from './auth/store/actions'
import {Store} from '@ngrx/store'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  // styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // title = 'mediumclone_angular';
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(authActions.getCurrentUser())
  }
}
