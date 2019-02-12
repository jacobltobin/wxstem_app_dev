import { call, put } from 'redux-saga/effects'
import StationActions from '../redux/StationsRedux'

export function* requestAll(api, action) {
  const response = yield call(api.get_all_stations)

  if (response) {
    const stations = response.data
    yield put(StationActions.requestAllSuccess(stations))
  } else {
    yield put(StationActions.fetchAllFailure())
  }
}
