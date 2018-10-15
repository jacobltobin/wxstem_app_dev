import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import APIActions from '../redux/APIRedux/'

export function* requestAllStations(api, action) {
  // const { stations } = action
  // make the call to the api

  // const response = yield call(api.get_all_stations)
  const response = yield call(api.get_all_stations)

  if (response) {
    const stations = response.data
    yield put(APIActions.requestAllStationsSuccess(stations))
  } else {
    yield put(APIActions.fetchAllStationsFailure())
  }
}
