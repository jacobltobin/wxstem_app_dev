import * as apiTransforms from '../../transforms/apiTransforms'

// request all the stations in the network
export const requestAll = state => {
  let fullList = null
  let strippedList = null
  let sectionedList = null
  let strippedSectionedList = null

  if (state.fullList) {
    if (state.fullList.length) {
      fullList = [...state.fullList]
    }
  }
  if (state.strippedList) {
    if (state.strippedList.length) {
      strippedList = [...state.strippedList]
    }
  }
  if (state.sectionedList) {
    if (state.sectionedList.length) {
      sectionedList = [...state.sectionedList]
    }
  }
  if (state.strippedSectionedList) {
    if (state.strippedSectionedList.length) {
      strippedSectionedList = [...state.strippedSectionedList]
    }
  }

  const newState = {
    fetching: true,
    fetched: false,
    fullList: fullList,
    strippedList: strippedList,
    sectionedList: sectionedList,
    strippedSectionedList: strippedSectionedList,
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
