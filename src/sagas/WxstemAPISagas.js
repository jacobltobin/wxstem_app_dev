import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import WxstemActions from '../redux/WxstemAPIRedux'

export function* requestAllStations(api, action) {
  // const { stations } = action
  // make the call to the api

  // const response = yield call(api.get_all_stations)
  const response = yield call(api.get_all_stations)

  if (response) {
    //   // const firstUser = path(['data', 'items'], response)[0]
    const stations = response.data
    //   // do data conversion here if needed
    yield put(WxstemActions.requestAllStationsSuccess(stations))
  } else {
    yield put(WxstemAPIActions.fetchAllStationsFailure())
  }
}

// const requestAllStationsSuccess = stations => {
//   console.tron.log(stations)
// }
