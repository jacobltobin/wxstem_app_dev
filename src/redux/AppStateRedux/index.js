import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import * as dashboardStationReducers from './dashboardStationReducers'
import * as selectedStationReducers from './selectedStationReducers'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  addDashboardStation: ['id'],
  removeDashboardStation: ['id'],
  setSelectedStation: ['id'],
})

export const AppStateActionTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  dashboard_stations: [],
  selected_station: null,
})

/* ------------- Selectors ------------- */
export const AppStateSelectors = {
  selectDashboardStations: state => state.app_state.dashboard_stations,
  selectSelectedStation: state => state.app_state.selected_station,
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_DASHBOARD_STATION]: dashboardStationReducers.addDashboardStation,
  [Types.REMOVE_DASHBOARD_STATION]:
    dashboardStationReducers.removeDashboardStation,
  [Types.SET_SELECTED_STATION]: selectedStationReducers.setSelectedStation,
})
