import * as apiTransforms from '../../transforms/apiTransforms'

// request all the stations in the network
export const requestAll = state => {
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
export const requestAllSuccess = (state, action) => {
  const { stations } = action
  const strippedList = stations
    .filter(station => {
      return station.domain.handle === 'en' ? false : true
    })
    .map(station => {
      return {
        name: station.name,
        domain: station.domain.name,
        state: station.geo.state,
        handle: station.handle,
        domainHandle: station.domain.handle,
        id: station.id,
        geo: station.geo,
      }
    })
  const strippedAlphabetizedList = apiTransforms.alphabetizeStations(
    strippedList,
  )
  const fullList = apiTransforms.alphabetizeStations(stations)
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
export const requestAllFailure = state => {
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
