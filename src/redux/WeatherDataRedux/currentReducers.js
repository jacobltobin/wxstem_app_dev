import * as apiTransforms from '../../transforms/apiTransforms'

// request one station current readings
export const getCurrentRequest = (state, action) => {
  const { id } = action
  let current_wxstem_data
  let fetched_wxstem_data
  let last_fetched_wxstem_data
  let sun = null

  if (state.byId) {
    if (state.byId[id]) {
      if (state.byId[id].sun) {
        sun = { ...state.byId[id].sun }
      }
      if (state.byId[id].wxstem) {
        if (state.byId[id].wxstem.data) {
          if (state.byId[id].wxstem.data.hasOwnProperty()) {
            fetched_wxstem_data = true
          }
        }
        last_fetched_wxstem_data = state.byId[id].wxstem.last_fetched
        current_wxstem_data = { ...state.byId[id].wxstem.data }
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
        wxstem: {
          error: null,
          fetched: fetched_wxstem_data,
          fetching: true,
          last_fetched: last_fetched_wxstem_data,
          data: current_wxstem_data,
        },
        sun: sun,
      },
    },
  }
  return state.merge(newState)
}
export const getCurrentSuccess = (state, action) => {
  const { id, response } = action
  let sun = null
  if (state.byId) {
    if (state.byId[id]) {
      if (state.byId[id]) {
        if (state.byId[id].sun) {
          sun = { ...state.byId[id].sun }
        }
      }
    }
  }

  const newState = {
    byId: {
      ...state.byId,
      [id]: {
        wxstem: {
          error: null,
          fetched: true,
          fetching: false,
          last_fetched: new Date().getTime(),
          data: apiTransforms.reorganizeLatestReadings(response.data),
        },
        sun: sun,
      },
    },
  }
  return state.merge(newState)
}
export const getCurrentFailure = (state, action) => {
  const { id, response } = action
  console.tron.log('log', response)
  let sun
  if (state.byId) {
    if (state.byId[id]) {
      if (state.byId[id]) {
        if (state.byId[id].sun) {
          sun = { ...state.byId[id].sun }
        }
      }
    }
  }
  const newState = {
    byId: {
      ...state.byId,
      [id]: {
        wxstem: {
          fetched: false,
          fetching: false,
          error: true,
          data: response.response,
        },
        sun: sun,
      },
    },
  }
  return state.merge(newState)
}
removeCurrent = (state, id) => {}

export const getCurrentSunRequest = (state, action) => {
  const { id } = action
  let current_sun_data
  let fetched_sun_data
  let last_fetched_sun_data
  let wxstem = null

  if (state.byId) {
    if (state.byId[id]) {
      if (state.byId[id]) {
        if (state.byId[id].wxstem) {
          wxstem = { ...state.byId[id].wxstem }
        }
        if (state.byId[id].sun) {
          fetched_sun_data = true
          last_fetched_sun_data = state.byId[id].sun.last_fetched
          current_sun_data = { ...state.byId[id].sun.data }
        }
      }
    }
  } else {
    fetched = false
    current_sun_data = null
  }

  const newState = {
    byId: {
      ...state.byId,
      [id]: {
        sun: {
          error: null,
          fetched: fetched_sun_data,
          fetching: true,
          last_fetched: last_fetched_sun_data,
          data: current_sun_data,
        },
        wxstem: wxstem,
      },
    },
  }
  return state.merge(newState)
}
export const getCurrentSunSuccess = (state, action) => {
  const { id, response } = action
  let wxstem = null

  if (state.byId) {
    if (state.byId[id]) {
      if (state.byId[id]) {
        if (state.byId[id].wxstem) {
          wxstem = { ...state.byId[id].wxstem }
        }
      }
    }
  }
  const newState = {
    byId: {
      ...state.byId,
      [id]: {
        sun: {
          error: null,
          fetched: true,
          fetching: false,
          last_fetched: new Date().getTime(),
          data: response.data,
        },
        wxstem: wxstem,
      },
    },
  }
  return state.merge(newState)
}
export const getCurrentSunFailure = (state, action) => {
  const { id, response } = action
  let wxstem = null
  if (state.byId) {
    if (state.byId[id]) {
      if (state.byId[id]) {
        if (state.byId[id].wxstem) {
          wxstem = { ...state.byId[id].wxstem }
        }
      }
    }
  }
  const newState = {
    byId: {
      ...state.byId,
      [id]: {
        sun: {
          fetched: false,
          fetching: false,
          error: response,
          data: null,
        },
        wxstem: wxstem,
      },
    },
  }
  return state.merge(newState)
}
removeCurrentSun = (state, id) => {}
