import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import * as loginUserReducers from './loginUserReducers'
import * as createUserReducers from './createUserReducers'
import * as logoffUserReducers from './logoffUserReducers'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginUser: ['uid', 'pwd'],
  loginUserSuccess: ['login_info'],
  loginUserFailure: null,

  createUser: ['uid', 'pwd', 'first_name', 'last_name'],
  createUserSuccess: ['login_info'],
  createUserFailure: null,

  logoffUser: ['uid', 'session_id'],
  logoffUserSuccess: null,
  logoffUserFailure: null,
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
  selectLoginInfo: state => state.user,
  selectUserId: state => state.user.id,
  selectIsFetching: state => state.user.fetching,
}

/* ------------- Special one off non saga'd/api'd reducer ------------- */
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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_USER]: loginUserReducers.loginUser,
  [Types.LOGIN_USER_SUCCESS]: loginUserReducers.loginUserSuccess,
  [Types.LOGIN_USER_FAILURE]: loginUserReducers.loginUserFailure,

  [Types.CREATE_USER]: createUserReducers.createUser,
  [Types.CREATE_USER_SUCCESS]: createUserReducers.createUserSuccess,
  [Types.CREATE_USER_FAILURE]: createUserReducers.createUserFailure,

  [Types.LOGOFF_USER]: logoffUserReducers.logoffUser,
  [Types.LOGOFF_USER_SUCCESS]: logoffUserReducers.logoffUserSuccess,
  [Types.LOGOFF_USER_FAILURE]: logoffUserReducers.logoffUserFailure,

  [Types.CLEAR_LOG_IN_ERROR]: clearLogInError,
})
