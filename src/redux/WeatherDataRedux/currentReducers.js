import * as apiTransforms from '../../transforms/apiTransforms'

// request one station current readings
export const getCurrentRequest = (state, action) => {
  const { id } = action
  let current_wxstem_data
  let fetched_wxstem_data
  let last_fetched_wxstem_data

  if (state.byId) {
    if (state.byId[id]) {
      if (state.byId[id].current.wxstem.data) {
        fetched_wxstem_data = true
        last_fetched_wxstem_data = state.byId[id].current.wxstem.last_fetched
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
          wxstem: {
            error: null,
            fetched: fetched_wxstem_data,
            fetching: true,
            last_fetched: last_fetched_wxstem_data,
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
          wxstem: {
            error: null,
            fetched: true,
            fetching: false,
            last_fetched: new Date().getTime(),
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
          wxstem: {
            fetched: false,
            fetching: false,
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
