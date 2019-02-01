import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'
import SUN_API from '../services/sun_api'
import FixtureAPI from '../services/fixtureApi'
import DebugConfig from '../config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../redux/StartupRedux'
import { UserActionTypes } from '../redux/APIRedux/User'
import { StationActionTypes } from '../redux/APIRedux/Stations'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import {
  requestAllStations,
  requestOneStationCurrent,
  requestOneStationCurrentSun,
  loginUser,
  createUser,
  logoffUser,
} from './APISagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const sun_api = DebugConfig.useFixtures ? FixtureAPI : SUN_API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // startup the app!
    takeLatest(StartupTypes.STARTUP, startup, api),

    // some sagas receive extra parameters in addition to an action
    takeLatest(
      StationActionTypes.REQUEST_ALL_STATIONS,
      requestAllStations,
      api,
    ),

    // some sagas receive extra parameters in addition to an action
    takeLatest(
      StationActionTypes.REQUEST_ONE_STATION_CURRENT,
      requestOneStationCurrent,
      api,
    ),

    takeLatest(
      StationActionTypes.REQUEST_ONE_STATION_CURRENT_SUN,
      requestOneStationCurrentSun,
      sun_api,
    ),

    takeLatest(UserActionTypes.LOGIN_USER, loginUser, api),
    takeLatest(UserActionTypes.CREATE_USER, createUser, api),
    takeLatest(UserActionTypes.LOGOFF_USER, logoffUser, api),
  ])
}
