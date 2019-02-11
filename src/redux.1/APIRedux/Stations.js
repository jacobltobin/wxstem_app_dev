import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import * as apiTransforms from '../../transforms/apiTransforms'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestAllStations: null,
  requestAllStationsSuccess: ['stations'],
  requestAllStationsFailure: null,

  requestOneStationCurrent: ['payload'],
  requestOneStationCurrentSuccess: ['payload'],
  requestOneStationCurrentFailure: null,

  requestOneStationForecast: ['payload'],
  requestOneStationForecastSuccess: ['payload'],
  requestOneStationForecastFailure: null,

  removeOneStationCurrent: ['id'],

  requestOneStationCurrentSun: ['payload'],
  requestOneStationCurrentSunSuccess: ['payload'],
  requestOneStationCurrentSunFailure: null,
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
  stationsCurrentData: null,
  stationsCurrentSunData: null,
  stationsForecastData: null,
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
  selectStationById: (state, id) => {
    let station = state.api.stations.fullList.filter(station => {
      return station.id === id
    })[0]
    return station
  },
  selectStationCurrentData: (state, id) => {
    let data = null
    if (
      state.api.stations.stationsCurrentData &&
      state.api.stations.stationsCurrentData[id]
    ) {
      data = state.api.stations.stationsCurrentData[id]
    }
    return data
  },
  selectStationForecastData: (state, id) => {
    let data = null
    if (
      state.api.stations.stationsForecastData &&
      state.api.stations.stationsForecastData[id]
    ) {
      data = state.api.stations.stationsForecastData[id]
    }
    return data
  },
}

/* ------------- Reducers ------------- */

// request all the stations in the network
export const stationRequest = state => {
  const newState = {
    fetching: true,
    fetched: false,
    fullList: [...state.fullList],
    strippedList: [...state.strippedList],
    sectionedList: [...state.sectionedList],
    strippedSectionedList: [...state.strippedSectionedList],
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
      id: station.id,
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

// request one station current readings
export const requestOneStationCurrent = state => {
  return state
}
export const requestOneStationCurrentSuccess = (state, action) => {
  const newState = {
    stationsCurrentData: {
      ...state.stationsCurrentData,
      [action.payload.id]: apiTransforms.reorganizeLatestReadings(
        action.payload.data,
      ),
    },
  }
  return state.merge(newState)
}
export const requestOneStationCurrentFailure = (state, action) => {
  return state
  // const newState = {
  //   stationsCurrentData: {
  //     action.payload.data
  //   }
  // }
}
removeOneStationCurrent = (state, id) => {}

// request one station current readings
export const requestOneStationCurrentSun = state => {
  return state
}
export const requestOneStationCurrentSunSuccess = (state, action) => {
  const newState = {
    stationsCurrentSunData: {
      ...state.stationsCurrentSunData,
      [action.payload.id]: action.payload.data,
    },
  }
  return state.merge(newState)
}
export const requestOneStationCurrentSunFailure = (state, action) => {
  console.tron.log('failure', action)
  return state
  // const newState = {
  //   stationsCurrentData: {
  //     action.payload.data
  //   }
  // }
}
removeOneStationCurrent = (state, id) => {}

// request one station forecast
export const requestOneStationForecast = state => {
  return state
}
export const requestOneStationForecastSuccess = (state, action) => {
  const newState = {
    stationsForecastData: {
      ...state.stationsForecastData,
      [action.payload.id]: action.payload.data,
    },
  }
  return state.merge(newState)
}
export const requestOneStationForecastFailure = (state, action) => {
  console.tron.log('failure', action)
  return state
  // const newState = {
  //   stationsForecastData: {
  //     action.payload.data
  //   }
  // }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_ALL_STATIONS]: stationRequest,
  [Types.REQUEST_ALL_STATIONS_SUCCESS]: stationRequestSuccess,
  [Types.REQUEST_ALL_STATIONS_FAILURE]: stationRequestFailure,

  [Types.REQUEST_ONE_STATION_CURRENT]: requestOneStationCurrent,
  [Types.REQUEST_ONE_STATION_CURRENT_SUCCESS]: requestOneStationCurrentSuccess,
  [Types.REQUEST_ONE_STATION_CURRENT_FAILURE]: requestOneStationCurrentFailure,

  [Types.REQUEST_ONE_STATION_FORECAST]: requestOneStationForecast,
  [Types.REQUEST_ONE_STATION_FORECAST_SUCCESS]: requestOneStationForecastSuccess,
  [Types.REQUEST_ONE_STATION_FORECAST_FAILURE]: requestOneStationForecastFailure,

  [Types.REMOVE_ONE_STATION_CURRENT]: removeOneStationCurrent,

  [Types.REQUEST_ONE_STATION_CURRENT_SUN]: requestOneStationCurrentSun,
  [Types.REQUEST_ONE_STATION_CURRENT_SUN_SUCCESS]: requestOneStationCurrentSunSuccess,
  [Types.REQUEST_ONE_STATION_CURRENT_SUN_FAILURE]: requestOneStationCurrentSunFailure,
})
