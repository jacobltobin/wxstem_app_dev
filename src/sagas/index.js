import { takeLatest, takeEvery, all } from 'redux-saga/effects'
import WxSTEM_API from '../services/wxstem_api'
import SUN_API from '../services/sun_api'
import FixtureAPI from '../services/fixtureApi'
import DebugConfig from '../config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../redux/StartupRedux'
import { UserActionTypes } from '../redux/UserRedux'
import { StationActionTypes } from '../redux/StationsRedux'
import { WeatherDataActionTypes } from '../redux/WeatherDataRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { loginUser, createUser, logoffUser } from './UserSagas'
import { requestAll } from './StationsSagas'
import { requestCurrent, requestForecast } from './WeatherDataSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const wxstem_api = DebugConfig.useFixtures ? FixtureAPI : WxSTEM_API.create()
const sun_api = DebugConfig.useFixtures ? FixtureAPI : SUN_API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // startup the app!
    takeLatest(StartupTypes.STARTUP, startup, wxstem_api),

    // some sagas receive extra parameters in addition to an action
    takeLatest(StationActionTypes.REQUEST_ALL, requestAll, wxstem_api),

    // some sagas receive extra parameters in addition to an action
    takeEvery(
      WeatherDataActionTypes.REQUEST_CURRENT,
      requestCurrent,
      wxstem_api,
    ),

    takeLatest(UserActionTypes.LOGIN_USER, loginUser, wxstem_api),
    takeLatest(UserActionTypes.CREATE_USER, createUser, wxstem_api),
    takeLatest(UserActionTypes.LOGOFF_USER, logoffUser, wxstem_api),
  ])
}
