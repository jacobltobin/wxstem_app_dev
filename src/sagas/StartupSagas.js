import { put, call, select, all } from 'redux-saga/effects'
import { is } from 'ramda'
import StationActions, { StationSelectors } from '../redux/StationsRedux/'
import WeatherDataActions from '../redux/WeatherDataRedux/'
import { AppStateSelectors } from '../redux/AppStateRedux'

export function* startup(wxstem_api, action) {
  const stations = yield select(StationSelectors.selectStationsFullList)
  if (stations === null) {
    const response = yield call(wxstem_api.get_all_stations)
    if (response) {
      const stations = response.data
      yield put(StationActions.requestAllSuccess(stations))
    } else {
      yield put(StationActions.requestAllFailure())
    }
  }

  const dashboard_stations = yield select(
    AppStateSelectors.selectDashboardStations,
  )
  if (dashboard_stations.length == 0) {
  } else {
    for (dashboard_station of dashboard_stations) {
      const station = yield select(
        StationSelectors.selectStationById,
        dashboard_station.id,
      )
      yield put(
        WeatherDataActions.getCurrentRequest(
          station.handle,
          station.domain.handle,
          station.id,
        ),
      )
      // yield put(
      //   StationActions.requestOneStationCurrentSun({
      //     lat: station.geo.lat,
      //     lng: station.geo.lng,
      //     id: station.id,
      //   }),
      // )
    }
  }
}
