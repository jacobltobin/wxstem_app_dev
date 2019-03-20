import { combineReducers } from 'redux'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import * as currentReducers from './currentReducers'
import * as forecastReducers from './forecastReducers'

/* ------------- Types and Action Creators ------------- */
/*
  this is a shorthand from the reduxsauce library that
  for example, out of the first entry in the object below,
  makes a type:

  const REQUEST_CURRENT: 'REQUEST_CURRENT'

  and an action creator:

  const requestCurrent = (id) => {
      type: types.REQUEST_CURRENT,
      value: id
  };


*/
const { Types, Creators } = createActions({
  getCurrentRequest: ['handle', 'domainHandle', 'id'],
  getCurrentSuccess: ['id', 'response'],
  getCurrentFailure: ['id', 'response'],

  removeCurrent: ['id'],

  getCurrentSunRequest: ['lat', 'lng', 'id'],
  getCurrentSunSuccess: ['id', 'response'],
  getCurrentSunFailure: ['id', 'response'],

  removeCurrentSun: ['id'],

  getHourlyForecastRequest: ['lat', 'lng', 'id'],
  getHourlyForecastSuccess: ['id', 'response'],
  getHourlyForecastFailure: ['id', 'response'],
})

export const WeatherDataActionTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  byId: null,
})

/* ------------- Selectors ------------- */
export const WeatherDataSelectors = {
  selectCurrent: (state, id) => {
    let data = null
    if (state.weather_data.current.byId) {
      if (state.weather_data.current.byId[id]) {
        if (state.weather_data.current.byId[id].wxstem) {
          if (state.weather_data.current.byId[id].sun) {
            data = state.weather_data.current.byId[id]
          }
        }
      }
    }
    return data
  },
  selectHourlyForecast: (state, id) => {
    let data = null
    if (state.weather_data.forecast.byId) {
      if (state.weather_data.forecast.byId[id]) {
        if (state.weather_data.forecast.byId[id]) {
          data = state.weather_data.forecast.byId[id].hourly
        }
      }
    }
    return data
  },
  // selectForecast: (state, id) => {
  //   let data = null
  //   if (
  //     state.stations.stationsForecastData &&
  //     state.stations.stationsForecastData[id]
  //   ) {
  //     data = state.stations.stationsForecastData[id]
  //   }
  //   return data
  // },
}

/* ------------- Hookup Reducers To Types ------------- */
/*
  this is a shorthand for a big switch case function
  that maps our reducer functions in the imported reducer 
  files to the actions created at the top
*/
const current_reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CURRENT_REQUEST]: currentReducers.getCurrentRequest,
  [Types.GET_CURRENT_SUCCESS]: currentReducers.getCurrentSuccess,
  [Types.GET_CURRENT_FAILURE]: currentReducers.getCurrentFailure,
  [Types.REMOVE_CURRENT]: currentReducers.removeCurrent,

  [Types.GET_CURRENT_SUN_REQUEST]: currentReducers.getCurrentSunRequest,
  [Types.GET_CURRENT_SUN_SUCCESS]: currentReducers.getCurrentSunSuccess,
  [Types.GET_CURRENT_SUN_FAILURE]: currentReducers.getCurrentSunFailure,
  [Types.REMOVE_CURRENT_SUN]: currentReducers.removeCurrentSun,
})

const forecast_reducer = createReducer(INITIAL_STATE, {
  [Types.GET_HOURLY_FORECAST_REQUEST]:
    forecastReducers.getHourlyForecastRequest,
  [Types.GET_HOURLY_FORECAST_SUCCESS]:
    forecastReducers.getHourlyForecastSuccess,
  [Types.GET_HOURLY_FORECAST_FAILURE]:
    forecastReducers.getHourlyForecastFailure,
})

export const reducer = combineReducers({
  forecast: forecast_reducer,
  current: current_reducer,
})
