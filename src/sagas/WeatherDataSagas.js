import { call, put } from 'redux-saga/effects'
import WeatherDataActions from '../redux/WeatherDataRedux'

export function* requestCurrent(api, action) {
  const { handle, domainHandle, id } = action
  const response = yield call(api.get_current, handle, domainHandle)

  if (response) {
    yield put(WeatherDataActions.requestCurrentSuccess(id, response))
  } else {
    yield put(WeatherDataActions.requestCurrentFailure())
  }
}

export function* requestForecast(api, action) {
  const response = yield call(api.get_forecast, action)

  if (response) {
    yield put(WeatherDataActions.requestForecastSuccess(response))
  } else {
    yield put(WeatherDataActions.requestForecastFailure())
  }
}
