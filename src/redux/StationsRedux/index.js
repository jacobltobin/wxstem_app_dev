import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import * as stationReducers from './stationReducers'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  requestAll: null,
  requestAllSuccess: ['stations'],
  requestAllFailure: null,
})

export const StationActionTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  fullList: null,
  strippedList: null,
  sectionedList: null,
  strippedSectionedList: null,
  fetching: false,
  fetched: false,
  error: null,
})

/* ------------- Selectors ------------- */
export const StationSelectors = {
  selectStationsFullList: state => state.stations.fullList,
  selectStationsStrippedList: state => state.stations.strippedList,
  selectStationsStrippedSectionedList: state =>
    state.stations.strippedSectionedList,
  selectStationsSectionedList: state => state.stations.sectionedList,
  isFetchingStations: state => state.stations.fetching,
  stationsFetched: state => state.stations.fetched,
  selectStationByHandle: (state, handle, domainHandle) => {
    let station = state.stations.fullList.filter(station => {
      return station.handle === handle && station.domain.handle === domainHandle
    })[0]
    return station
  },
  selectStationById: (state, id) => {
    let station = state.stations.fullList.filter(station => {
      return station.id === id
    })[0]
    return station
  },
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_ALL]: stationReducers.requestAll,
  [Types.REQUEST_ALL_SUCCESS]: stationReducers.requestAllSuccess,
  [Types.REQUEST_ALL_FAILURE]: stationReducers.requestAllFailure,
})
