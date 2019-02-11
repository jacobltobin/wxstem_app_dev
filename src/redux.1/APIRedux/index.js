import { combineReducers } from 'redux'

/* ------------- Assemble The Reducers ------------- */
export const reducer = combineReducers({
  user: require('./User').reducer,
  stations: require('./Stations').reducer,
})
