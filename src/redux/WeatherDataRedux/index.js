import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import * as currentReducers from './currentReducers'
import * as forecastReducers from './currentReducers'

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

  requestForecast: ['id'],
  requestForecastSuccess: ['data'],
  requestForecastFailure: null,
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
    if (state.weather_data.byId) {
      if (state.weather_data.byId[id]) {
        data = state.weather_data.byId[id].current
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
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CURRENT_REQUEST]: currentReducers.getCurrentRequest,
  [Types.GET_CURRENT_SUCCESS]: currentReducers.getCurrentSuccess,
  [Types.GET_CURRENT_FAILURE]: currentReducers.getCurrentFailure,
  [Types.REMOVE_CURRENT]: currentReducers.removeCurrent,

  [Types.REQUEST_FORECAST]: forecastReducers.requestForecast,
  [Types.REQUEST_FORECAST_SUCCESS]: forecastReducers.requestForecastSuccess,
  [Types.REQUEST_FORECAST_FAILURE]: forecastReducers.requestForecastFailure,
})
