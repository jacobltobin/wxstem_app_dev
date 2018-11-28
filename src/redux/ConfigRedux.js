import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addStationToDashboard: ['handle', 'domainHandle'],
})

export const ConfigActionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  dashboard_stations: [],
})

/* ------------- Selectors ------------- */

export const ConfigSelectors = {
  selectDashboardStations: state => state.config.dashboard_stations,
}

/* ------------- Login User Reducers ------------- */

export const addStationToDashboard = (state, action) => {
  console.tron.log(action)
  const station = {
    handle: action.handle,
    domainHandle: action.domainHandle,
  }
  const newState = {
    dashboard_stations: [...state.dashboard_stations, station],
  }
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_STATION_TO_DASHBOARD]: addStationToDashboard,
})
