import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import * as apiTransforms from '../../transforms/apiTransforms'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestAllStations: null,
  requestAllStationsSuccess: ['stations'],
  requestAllStationsFailure: null,
  loginUser: ['payload'],
  loginUserSuccess: ['login_info'],
  loginUserFailure: null,
  createUser: ['payload'],
  createUserSuccess: ['login_info'],
  createUserFailure: null,
  clearLogInError: null,
})

export const APIActionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userInfo: {
    logged_in: false,
    fetching: false,
    api_error: null,
    login_info: {
      data: {
        error: null,
      },
    },
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
  selectLoginInfo: state => state.api.userInfo,
  selectStationsSectionedList: state =>
    state.api.networkData.stations.sectionedList,
  isFetchingStations: state => state.api.networkData.stations.fetching,
  selectStationByHandle: (state, handle, domainHandle) =>
    state.api.networkData.stations.fullList.filter(station => {
      return station.handle === handle && station.domain.handle === domainHandle
    })[0],
  selectUserId: state => state.api.userInfo.id,
}

/* ------------- Reducers ------------- */

// request all the stations in the network
export const stationRequest = state => {
  const newState = {
    networkData: {
      stations: {
        fetching: true,
        fullList: null,
        strippedList: null,
        sectionedList: null,
      },
    },
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
export const stationRequestFailure = state => {
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

/* ------------- Reducers ------------- */

// request all the stations in the network
export const loginUser = state => {
  const newState = {
    userInfo: {
      logged_in: false,
      fetching: true,
      api_error: null,
      login_info: {
        data: {
          error: null,
        },
      },
    },
  }
  return state.merge(newState)
}

// successful REQUEST not necessarily successful login
export const loginUserSuccess = (state, action) => {
  const login_info = action.login_info
  const newState = {
    userInfo: {
      logged_in: login_info.data.error ? false : true,
      fetching: false,
      api_error: login_info.data.error ? login_info.data.error : null,
      login_info: login_info,
    },
  }
  return state.merge(newState)
}

// request failed
export const loginUserFailure = state => {
  const newState = {
    userInfo: {
      logged_in: false,
      fetching: false,
      login_info: {
        data: {
          error: null,
        },
      },
    },
  }
  return state.merge(newState)
}

/* ------------- Reducers ------------- */

// request all the stations in the network
export const createUser = state => {
  const newState = {
    userInfo: {
      logged_in: false,
      fetching: true,
      api_error: null,
      login_info: {
        data: {
          error: null,
        },
      },
    },
  }
  return state.merge(newState)
}

// successful REQUEST not necessarily successful login
export const createUserSuccess = (state, action) => {
  const login_info = action.login_info
  const newState = {
    userInfo: {
      logged_in: login_info.data.error ? false : true,
      fetching: false,
      api_error: login_info.data.error ? login_info.data.error : null,
      login_info: login_info,
    },
  }
  return state.merge(newState)
}

// request failed
export const createUserFailure = state => {
  const newState = {
    userInfo: {
      logged_in: false,
      fetching: false,
      api_error: 'server error',
      login_info: {
        data: {
          error: null,
        },
      },
    },
  }
  return state.merge(newState)
}

export const clearLogInError = state => {
  const newState = {
    userInfo: {
      logged_in: false,
      fetching: false,
      api_error: null,
      login_info: {
        data: null,
      },
    },
  }
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_ALL_STATIONS]: stationRequest,
  [Types.REQUEST_ALL_STATIONS_SUCCESS]: stationRequestSuccess,
  [Types.REQUEST_ALL_STATIONS_FAILURE]: stationRequestFailure,
  [Types.LOGIN_USER]: loginUser,
  [Types.LOGIN_USER_SUCCESS]: loginUserSuccess,
  [Types.LOGIN_USER_FAILURE]: loginUserFailure,
  [Types.CREATE_USER]: createUser,
  [Types.CREATE_USER_SUCCESS]: createUserSuccess,
  [Types.CREATE_USER_FAILURE]: createUserFailure,
  [Types.CLEAR_LOG_IN_ERROR]: clearLogInError,
})
