import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'
import FixtureAPI from '../services/fixtureApi'
import DebugConfig from '../config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../redux/StartupRedux'
import { APIActionTypes } from '../redux/APIRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { requestAllStations } from './APISagas'
import { loginUser } from './APISagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(APIActionTypes.REQUEST_ALL_STATIONS, requestAllStations, api),

    takeLatest(APIActionTypes.LOGIN_USER, loginUser, api),
  ])
}
