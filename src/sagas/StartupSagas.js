import { put, call, select, all } from 'redux-saga/effects'
import { is } from 'ramda'
import StationActions, { StationSelectors } from '../redux/APIRedux/Stations'
import { ConfigSelectors } from '../redux/ConfigRedux'

// process STARTUP actions
export function* startup(api, action) {
  // if (__DEV__ && console.tron) {
  //   console.tron.log({
  //     message: 'API?',
  //     object: api,
  //   })
  // }

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

  const dashboard_stations = yield select(
    ConfigSelectors.selectDashboardStations,
  )
  if (dashboard_stations.length == 0) {
  } else {
    for (dashboard_station of dashboard_stations) {
      const station = yield select(
        StationSelectors.selectStationById,
        dashboard_station.id,
      )
      yield put(
        StationActions.requestOneStationCurrent({
          handle: station.handle,
          domainHandle: station.domain.handle,
          id: station.id,
        }),
      )
    }
  }
}
