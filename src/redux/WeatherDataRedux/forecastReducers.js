import * as apiTransforms from '../../transforms/apiTransforms'

// request one station current readings
export const requestForecast = state => {
  return state
}
export const requestForecastSuccess = (state, action) => {
  const { id, data } = action
  const newState = {
    ...state.data,
    [id]: data,
  }
  return state.merge(newState)
}
export const requestForecastFailure = (state, action) => {
  return state
  // const newState = {
  //   stationsCurrentData: {
  //     action.payload.data
  //   }
  // }
}
