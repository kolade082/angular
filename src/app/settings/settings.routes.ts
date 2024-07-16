import {Route} from '@angular/router'
import {SettingsComponents} from './components/settings/settings.components'
import {provideState} from '@ngrx/store'
import {settingsFeatureKey, settingsReducer} from './store/reducer'

export const routes: Route[] = [
  {
    path: '',
    component: SettingsComponents,
    providers: [provideState(settingsFeatureKey, settingsReducer)],
  }
]
