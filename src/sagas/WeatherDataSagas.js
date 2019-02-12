import { call, put } from 'redux-saga/effects'
import WeatherDataActions from '../redux/WeatherDataRedux'

export function* getCurrentRequest(api, action) {
  const { handle, domainHandle, id } = action
  try {
    const response = yield call(api.get_current, handle, domainHandle)
    yield put(WeatherDataActions.getCurrentSuccess(id, response))
  } catch (e) {
    yield put(WeatherDataActions.getCurrentFailure(id, e))
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
