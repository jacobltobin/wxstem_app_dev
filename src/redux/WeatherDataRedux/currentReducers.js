import * as apiTransforms from '../../transforms/apiTransforms'

// request one station current readings
export const requestCurrent = state => {
  return state
}
export const requestCurrentSuccess = (state, action) => {
  const { id, response } = action
  const newState = {
    byId: {
      ...state.byId,
      [id]: {
        current: {
          wxstem: apiTransforms.reorganizeLatestReadings(response.data),
        },
      },
    },
  }
  return state.merge(newState)
}
export const requestCurrentFailure = (state, action) => {
  return state
  // const newState = {
  //   stationsCurrentData: {
  //     action.payload.data
  //   }
  // }
}
removeCurrent = (state, id) => {}
