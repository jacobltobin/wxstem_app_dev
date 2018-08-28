import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestAllStations: null,
  requestAllStationsSuccess: ['stations'],
  requestAllStationsFailure: null,
})

export const WxstemAPITypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  stations: null,
  fetching: null,
  error: null,
})

/* ------------- Selectors ------------- */

export const WxstemSelectors = {
  selectStations: state => state.wxstem.stations,
  isFetching: state => state.wxstem.fetching,
}

/* ------------- Reducers ------------- */

// request all the stations in the network
export const request = state => state.merge({ fetching: true, stations: null })

// successful station lookup
export const success = (state, action) => {
  const { stations } = action
  return state.merge({ fetching: false, error: null, stations })
}

// failed to get the stations
export const failure = state =>
  state.merge({ fetching: false, error: true, avatar: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_ALL_STATIONS]: request,
  [Types.REQUEST_ALL_STATIONS_SUCCESS]: success,
  [Types.REQUEST_ALL_STATIONS_FAILURE]: failure,
})
