import { put, call, select } from 'redux-saga/effects'
import { is } from 'ramda'
import { StationSelectors } from '../redux/APIRedux/Stations'
import StationActions from '../redux/APIRedux/Stations'

// process STARTUP actions
export function* startup(api, action) {
  if (__DEV__ && console.tron) {
    console.tron.log({
      message: 'API?',
      object: api,
    })
  }

  const stations = yield select(StationSelectors.selectStationsFullList)
  if (stations === null) {
    const response = yield call(api.get_all_stations)
    if (response) {
      const stations = response.data
      yield put(StationActions.requestAllStationsSuccess(stations))
    } else {
      yield put(StationActions.fetchAllStationsFailure())
    }
  }
}
