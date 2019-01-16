import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addStationToDashboard: ['handle', 'domainHandle'],
  removeStationFromDashboard: ['handle', 'domainHandle']
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
  const station = {
    handle: action.handle,
    domainHandle: action.domainHandle,
    key: state.dashboard_stations.length
  }
  const newState = {
    dashboard_stations: [...state.dashboard_stations, station],
  }
  return state.merge(newState)
}

export const removeStationFromDashboard = (state, action) => {
  const prevIndex = state.dashboard_stations.findIndex(item => item.handle === action.handle && item.domainHandle === action.domainHandle)
  const newData = [...state.dashboard_stations]
  newData.splice(prevIndex, 1)
  newNewData = []
  newData.forEach((item, i) => {
    newNewData.push({
      handle: item.handle,
      domainHandle: item.domainHandle,
      key: i
    })
  })
  console.tron.log(newNewData)
  const newState = {
    dashboard_stations: newNewData
  }
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_STATION_TO_DASHBOARD]: addStationToDashboard,
  [Types.REMOVE_STATION_FROM_DASHBOARD]: removeStationFromDashboard,
})
