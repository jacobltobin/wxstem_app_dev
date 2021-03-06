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

export function* getCurrentSunRequest(api, action) {
  const { lat, lng, id } = action
  try {
    const response = yield call(api.get_current, lat, lng, id)
    yield put(WeatherDataActions.getCurrentSunSuccess(id, response))
  } catch (e) {
    yield put(WeatherDataActions.getCurrentSunFailure(id, e))
  }
}

export function* getHourlyForecastRequest(api, action) {
  const { lat, lng, id } = action
  try {
    const response = yield call(api.get_hourly_forecast, lat, lng)
    yield put(WeatherDataActions.getHourlyForecastSuccess(id, response))
  } catch (e) {
    yield put(WeatherDataActions.getHourlyForecastFailure(id, e))
  }
}
