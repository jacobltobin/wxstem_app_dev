import * as apiTransforms from '../../transforms/apiTransforms'

// request one station current readings
export const getCurrentRequest = (state, action) => {
  const { id } = action
  let current_wxstem_data
  let fetched

  if (state.byId) {
    if (state.byId[id]) {
      if (state.byId[id].current.wxstem.data) {
        fetched = true
        current_wxstem_data = { ...state.byId[id].current.wxstem.data }
      }
    }
  } else {
    fetched = false
    current_wxstem_data = null
  }

  const newState = {
    byId: {
      ...state.byId,
      [id]: {
        current: {
          fetched: fetched,
          fetching: true,
          wxstem: {
            error: null,
            data: current_wxstem_data,
          },
        },
      },
    },
  }
  return state.merge(newState)
}
export const getCurrentSuccess = (state, action) => {
  const { id, response } = action
  const newState = {
    byId: {
      ...state.byId,
      [id]: {
        current: {
          fetched: true,
          fetching: false,
          wxstem: {
            error: null,
            data: apiTransforms.reorganizeLatestReadings(response.data),
          },
        },
      },
    },
  }
  return state.merge(newState)
}
export const getCurrentFailure = (state, action) => {
  const { id, response } = action
  const newState = {
    byId: {
      ...state.byId,
      [id]: {
        current: {
          fetched: false,
          fetching: false,
          wxstem: {
            error: response,
            data: null,
          },
        },
      },
    },
  }
  return state.merge(newState)
}
removeCurrent = (state, id) => {}
