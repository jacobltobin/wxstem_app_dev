import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestAllStations: null,
  requestAllStationsSuccess: ['stations'],
  requestAllStationsFailure: null,
})

export const APIActionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userInfo: {
    loggedIn: false,
    fetching: false,
    username: null,
    id: null,
    error: null,
  },
  networkData: {
    stations: {
      fullList: null,
      strippedList: null,
      fetching: null,
      error: null,
    },
  },
})

/* ------------- Selectors ------------- */

export const APISelectors = {
  selectStations: state => state.api.networkData.stations.strippedList,
  isFetchingStations: state => state.api.networkData.stations.fetching,
}

/* ------------- Reducers ------------- */

// request all the stations in the network
export const request = state => {
  const newState = {
    networkData: {
      stations: {
        fetching: true,
        fullList: null,
        strippedList: null,
      },
    },
  }
  return state.merge(newState)
}

// successful station lookup
export const success = (state, action) => {
  const list = action.stations
  console.tron.log(list)
  const newState = {
    networkData: {
      stations: {
        fetching: false,
        error: null,
        fullList: list,
        strippedList: list.map(station => {
          return {
            name: station.name,
            domain: station.domain.name,
            state: station.geo.state,
          }
        }),
      },
    },
  }
  return state.merge(newState)
}

// failed to get the stations
export const failure = state => {
  const newState = {
    networkData: {
      stations: {
        fetching: false,
        error: true,
        fullList: null,
        strippedList: null,
      },
    },
  }
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_ALL_STATIONS]: request,
  [Types.REQUEST_ALL_STATIONS_SUCCESS]: success,
  [Types.REQUEST_ALL_STATIONS_FAILURE]: failure,
})
