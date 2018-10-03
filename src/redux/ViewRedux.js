import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setSelectedStation: ['handle', 'domainHandle'],
})

export const ViewActionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  selectedStation: null,
})

/* ------------- Selectors ------------- */

export const ViewSelectors = {
  selectSelectedStation: state => state.view.selectedStation,
}

/* ------------- Reducers ------------- */

export const setSelectedStation = (state, action) => {
  const newState = {
    selectedStation: {
      handle: action.handle,
      domainHandle: action.domainHandle,
    },
  }
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_SELECTED_STATION]: setSelectedStation,
})
