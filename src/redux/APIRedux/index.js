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
      list: null,
      fetching: null,
      error: null,
    },
  },
})

/* ------------- Selectors ------------- */

export const APISelectors = {
  selectStations: state => state.api.networkData.stations.list,
  isFetchingStations: state => state.api.networkData.stations.fetching,
}

/* ------------- Reducers ------------- */

// request all the stations in the network
export const request = state => {
  const newState = {
    networkData: {
      stations: {
        fetching: true,
        list: null
      }
    }
  }
  return state.merge(newState)
}

// successful station lookup
export const success = (state, action) => {
  const list = action.stations
  const newState = {
    networkData: {
      stations: {
        fetching: false,
        error: null,
        list: list
      }
    }
  }
  console.tron.log('action from success action', action)
  return state.merge(newState)
}

// failed to get the stations
export const failure = state => {
  const newState = {
    networkData: {
      stations: {
        fetching: false,
        error: true,
        list: null
      }
    }
  }
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_ALL_STATIONS]: request,
  [Types.REQUEST_ALL_STATIONS_SUCCESS]: success,
  [Types.REQUEST_ALL_STATIONS_FAILURE]: failure,
})
