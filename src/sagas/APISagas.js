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

export function* loginUser(api, action) {
  const response = yield call(api.login_user, action)

  if (response) {
    yield put(APIActions.loginUserSuccess(response))
  } else {
    yield put(APIActions.loginUserFailure())
  }
}

export function* createUser(api, action) {
  const response = yield call(api.create_user, action)

  if (response) {
    yield put(APIActions.createUserSuccess(response))
  } else {
    yield put(APIActions.createUserFailure())
  }
}
