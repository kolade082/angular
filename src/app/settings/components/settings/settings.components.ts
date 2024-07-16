import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormBuilder, ReactiveFormsModule} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {selectCurrentUser} from '../../../auth/store/reducers'
import {filter, Subscription} from 'rxjs'
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface'
import {combineLatest} from 'rxjs'
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducer'
import {BackendErrorMessages} from '../../../shared/components/backendErrorMessages/backendErrorMessages'
import {CommonModule} from '@angular/common'
import {CurrentUserRequestInterface} from '../../../shared/types/currentUserRequest.interface'
import {authActions} from '../../../auth/store/actions'

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.components.html',
  imports: [
    BackendErrorMessages,
    CommonModule,
    ReactiveFormsModule
  ],
  standalone: true
})
export class SettingsComponents implements OnInit, OnDestroy{
  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  })
  currentUser?: CurrentUserInterface
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })
  currentUserSubscription?:Subscription

  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    this.store.pipe(
      select(selectCurrentUser),
      filter(Boolean)
    ).subscribe(currentUser => {
      this.currentUser = currentUser
      this.initializeForm()
    })
  }

  ngOnDestroy(){
    this.currentUserSubscription?.unsubscribe()
  }
  initializeForm(){
    if (!this.currentUser) {
      throw new Error('current user is not set')
    }
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    })
  }

  submit(){
    if (!this.currentUser) {
      throw new Error('current user is not set')
    }
    const currentUserRequest: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    }
    this.store.dispatch(authActions.updateCurrentUser({currentUserRequest}))
  }

  logout(){
    this.store.dispatch(authActions.logout())
  }
}
