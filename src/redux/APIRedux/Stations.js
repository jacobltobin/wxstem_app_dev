import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import * as apiTransforms from '../../transforms/apiTransforms'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestAllStations: null,
  requestAllStationsSuccess: ['stations'],
  requestAllStationsFailure: null,
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
  selectStationsFullList: state => state.api.stations.fullList,
  selectStationsStrippedList: state => state.api.stations.strippedList,
  selectStationsStrippedSectionedList: state =>
    state.api.stations.strippedSectionedList,
  selectStationsSectionedList: state => state.api.stations.sectionedList,
  isFetchingStations: state => state.api.stations.fetching,
  stationsFetched: state => state.api.stations.fetched,
  selectStationByHandle: (state, handle, domainHandle) => {
    let station = state.api.stations.fullList.filter(station => {
      return station.handle === handle && station.domain.handle === domainHandle
    })[0]
    return station
  },
}

/* ------------- Reducers ------------- */

// request all the stations in the network
export const stationRequest = state => {
  const newState = {
    fetching: true,
    fetched: false,
    fullList: null,
    strippedList: null,
    sectionedList: null,
    strippedSectionedList: null,
  }
  return state.merge(newState)
}

// successful station lookup
export const stationRequestSuccess = (state, action) => {
  const list = action.stations
  const strippedList = list.map(station => {
    return {
      name: station.name,
      domain: station.domain.name,
      state: station.geo.state,
      handle: station.handle,
      domainHandle: station.domain.handle,
    }
  })
  const strippedAlphabetizedList = apiTransforms.alphabetizeStations(
    strippedList,
  )
  const fullList = apiTransforms.alphabetizeStations(list)
  const sectionedList = apiTransforms.createSectionedStations(
    strippedAlphabetizedList,
  )
  const strippedSectionedList = apiTransforms.createStrippedSectionedStations(
    strippedAlphabetizedList,
  )
  const newState = {
    fetching: false,
    fetched: true,
    error: null,
    fullList: fullList,
    strippedList: strippedList,
    sectionedList: sectionedList,
    strippedSectionedList: strippedSectionedList,
  }
  return state.merge(newState)
}

// failed to get the stations
export const stationRequestFailure = state => {
  const newState = {
    fetching: false,
    fetched: false,
    error: true,
    fullList: null,
    strippedList: null,
    strippedSectionedList: null,
  }
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_ALL_STATIONS]: stationRequest,
  [Types.REQUEST_ALL_STATIONS_SUCCESS]: stationRequestSuccess,
  [Types.REQUEST_ALL_STATIONS_FAILURE]: stationRequestFailure,
})
