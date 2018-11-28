import { call, put } from 'redux-saga/effects'
import UserActions from '../redux/APIRedux/User'
import StationActions from '../redux/APIRedux/Stations'

export function* requestAllStations(api, action) {
  // const { stations } = action
  // make the call to the api

  // const response = yield call(api.get_all_stations)
  const response = yield call(api.get_all_stations)

  if (response) {
    const stations = response.data
    yield put(StationActions.requestAllStationsSuccess(stations))
  } else {
    yield put(StationActions.fetchAllStationsFailure())
  }
}

export function* loginUser(api, action) {
  const response = yield call(api.login_user, action)

  if (response) {
    yield put(UserActions.loginUserSuccess(response))
  } else {
    yield put(UserActions.loginUserFailure())
  }
}

export function* createUser(api, action) {
  const response = yield call(api.create_user, action)

  if (response) {
    yield put(UserActions.createUserSuccess(response))
  } else {
    yield put(UserActions.createUserFailure())
  }
}
