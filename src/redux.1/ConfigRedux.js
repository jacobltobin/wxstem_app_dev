import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { removeOneStationCurrent } from './APIRedux/Stations'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addStationToDashboard: ['id'],
  removeStationFromDashboard: ['id'],
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
    id: action.id,
    key: state.dashboard_stations.length + 1,
  }
  const newState = {
    dashboard_stations: [...state.dashboard_stations, station],
  }
  return state.merge(newState)
}

export const removeStationFromDashboard = (state, action) => {
  const prevIndex = state.dashboard_stations.findIndex(
    item => item.id === action.id,
  )
  const newData = [...state.dashboard_stations]
  newData.splice(prevIndex, 1)
  newNewData = []
  newData.forEach((item, i) => {
    newNewData.push({
      id: item.id,
      key: i + 1,
    })
  })
  console.tron.log(newNewData)
  const newState = {
    dashboard_stations: newNewData,
  }
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_STATION_TO_DASHBOARD]: addStationToDashboard,
  [Types.REMOVE_STATION_FROM_DASHBOARD]: removeStationFromDashboard,
})
