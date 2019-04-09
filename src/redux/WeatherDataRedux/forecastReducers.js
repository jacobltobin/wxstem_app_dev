import * as apiTransforms from '../../transforms/apiTransforms'

// request one station current readings
export const getHourlyForecastRequest = (state, action) => {
  const { id } = action
  let forecast_data
  let fetched_data
  let last_fetched_data

  if (state.byId) {
    if (state.byId[id]) {
      if (state.byId[id]) {
        if (state.byId[id].hourly) {
          if (state.byId[id].hourly.data) {
            if (state.byId[id].hourly.data.hasOwnProperty()) {
              fetched_data = true
            }
          }
          last_fetched_data = state.byId[id].hourly.last_fetched
          forecast_data = { ...state.byId[id].hourly }
        }
      }
    } else {
      fetched = false
      forecast_data = null
    }
  }

  const newState = {
    byId: {
      ...state.byId,
      [id]: {
        hourly: {
          error: null,
          fetched: fetched_data,
          fetching: true,
          last_fetched: last_fetched_data,
          data: forecast_data,
        },
      },
    },
  }
  return state.merge(newState)
}
export const getHourlyForecastSuccess = (state, action) => {
  const { id, response } = action
  // if (state.byId) {
  //   if (state.byId[id]) {
  //     if (state.byId[id]) {
  //       if (state.byId[id].hourly) {
  //         sun = { ...state.byId[id].hourly }
  //       }
  //     }
  //   }
  // }

  const newState = {
    byId: {
      ...state.byId,
      [id]: {
        hourly: {
          error: null,
          fetched: true,
          fetching: false,
          last_fetched: new Date().getTime(),
          data: response.data.forecasts,
        },
      },
    },
  }
  return state.merge(newState)
}
export const getHourlyForecastFailure = (state, action) => {
  return state
  // const newState = {
  //   stationsCurrentData: {
  //     action.payload.data
  //   }
  // }
}
