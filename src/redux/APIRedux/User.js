import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginUser: ['payload'],
  loginUserSuccess: ['login_info'],
  loginUserFailure: null,

  logoutUser: ['payload'],
  logoutUserSuccess: ['login_info'],
  logoutUserFailure: null,

  createUser: ['payload'],
  createUserSuccess: ['login_info'],
  createUserFailure: null,
  clearLogInError: null,
})

export const UserActionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  logged_in: false,
  fetching: false,
  api_error: null,
  login_info: {
    data: {
      error: null,
    },
  },
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  selectLoginInfo: state => state.api.user,
  selectUserId: state => state.api.user.id,
}

/* ------------- Login User Reducers ------------- */

// request all the stations in the network
export const loginUser = state => {
  const newState = {
    logged_in: false,
    fetching: true,
    api_error: null,
    login_info: {
      data: {
        error: null,
      },
    },
  }
  return state.merge(newState)
}

// successful REQUEST not necessarily successful login
export const loginUserSuccess = (state, action) => {
  const login_info = action.login_info
  const newState = {
    logged_in: login_info.data.error ? false : true,
    fetching: false,
    api_error: login_info.data.error ? login_info.data.error : null,
    login_info: login_info,
  }
  return state.merge(newState)
}

// request failed
export const loginUserFailure = state => {
  const newState = {
    logged_in: false,
    fetching: false,
    login_info: {
      data: {
        error: null,
      },
    },
  }
  return state.merge(newState)
}

// remove error from state
export const clearLogInError = state => {
  const newState = {
    logged_in: false,
    fetching: false,
    api_error: null,
    login_info: {
      data: null,
    },
  }
  return state.merge(newState)
}

/* ------------- Logout User Reducers ------------- */

// request all the stations in the network
export const logoutUser = state => {
  const newState = {
    logged_in: true,
    fetching: true,
    api_error: null,
    login_info: {
      data: {
        error: null,
      },
    },
  }
  return state.merge(newState)
}

// successful REQUEST not necessarily successful login
export const logoutUserSuccess = (state, action) => {
  const logout_info = action.logout_info
  const newState = {
    logged_in: logout_info.data.error ? false : true,
    fetching: false,
    api_error: logout_info.data.error ? logout_info.data.error : null,
    login_info: logout_info,
  }
  return state.merge(newState)
}

// request failed
export const logoutUserFailure = state => {
  const newState = {
    logged_in: true,
    fetching: false,
    login_info: {
      data: {
        error: null,
      },
    },
  }
  return state.merge(newState)
}

/* ------------- Create User Reducers ------------- */

// request all the stations in the network
export const createUser = state => {
  const newState = {
    logged_in: false,
    fetching: true,
    api_error: null,
    login_info: {
      data: {
        error: null,
      },
    },
  }
  return state.merge(newState)
}

// successful REQUEST not necessarily successful login
export const createUserSuccess = (state, action) => {
  const login_info = action.login_info
  const newState = {
    logged_in: login_info.data.error ? false : true,
    fetching: false,
    api_error: login_info.data.error ? login_info.data.error : null,
    login_info: login_info,
  }
  return state.merge(newState)
}

// request failed
export const createUserFailure = state => {
  const newState = {
    logged_in: false,
    fetching: false,
    api_error: 'server error',
    login_info: {
      data: {
        error: null,
      },
    },
  }
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_USER]: loginUser,
  [Types.LOGIN_USER_SUCCESS]: loginUserSuccess,
  [Types.LOGIN_USER_FAILURE]: loginUserFailure,

  [Types.LOGOUT_USER]: logoutUser,
  [Types.LOGOUT_USER_SUCCESS]: logoutUserSuccess,
  [Types.LOGOUT_USER_FAILURE]: logoutUserFailure,

  [Types.CREATE_USER]: createUser,
  [Types.CREATE_USER_SUCCESS]: createUserSuccess,
  [Types.CREATE_USER_FAILURE]: createUserFailure,

  [Types.CLEAR_LOG_IN_ERROR]: clearLogInError,
})
