import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'
import WxSTEM_API from '../services/wxstem_api'
import FixtureAPI from '../services/fixtureApi'
import DebugConfig from '../config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../redux/StartupRedux'
import { GithubTypes } from '../redux/GithubRedux'
import { WxstemAPITypes } from '../redux/WxstemAPIRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { requestAllStations } from './WxstemAPISagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const wxstem_api = DebugConfig.useFixtures ? FixtureAPI : WxSTEM_API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    // some sagas receive extra parameters in addition to an action
    takeLatest(
      WxstemAPITypes.REQUEST_ALL_STATIONS,
      requestAllStations,
      wxstem_api,
    ),
  ])
}
