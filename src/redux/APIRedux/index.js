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

const alphabetizeStations = stations => {
  const sortableData = JSON.parse(JSON.stringify(stations))
  function compare(a, b) {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  }
  sortableData.sort(compare)
  return sortableData
}
const alphabetizeSections = sections => {
  function compare(a, b) {
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  }
  sections.sort(compare)
  return sections
}
const createSectionedStations = stations => {
  console.tron.log('hello?')
  const data = []
  const sectionIndex = []
  stations.forEach(station => {
    const stationIndex = sectionIndex.indexOf(station.state)
    if (stationIndex > -1) {
      data[stationIndex].data.push(station)
    } else {
      const entry = Object.create({
        title: station.state,
        data: [station],
      })
      data.push(entry)
      sectionIndex.push(station.state)
    }
  })
  return alphabetizeSections(data)
}

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
      sectionedList: null,
      fetching: null,
      error: null,
    },
  },
})

/* ------------- Selectors ------------- */

export const APISelectors = {
  selectStationsFullList: state => state.api.networkData.stations.fullList,
  selectStationsStrippedList: state =>
    state.api.networkData.stations.strippedList,
  selectStationsSectionedList: state =>
    state.api.networkData.stations.sectionedList,
  isFetchingStations: state => state.api.networkData.stations.fetching,
  selectStationByHandle: (state, handle, domainHandle) =>
    state.api.networkData.stations.fullList.filter(station => {
      return station.handle === handle && station.domain.handle === domainHandle
    })[0],
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
  const strippedList = alphabetizeStations(
    list.map(station => {
      return {
        name: station.name,
        domain: station.domain.name,
        state: station.geo.state,
        handle: station.handle,
        domainHandle: station.domain.handle,
      }
    }),
  )
  const fullList = alphabetizeStations(fullList)
  const sectionedList = createSectionedStations(strippedList)
  const newState = {
    networkData: {
      stations: {
        fetching: false,
        error: null,
        fullList: fullList,
        strippedList: strippedList,
        sectionedList: sectionedList,
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
