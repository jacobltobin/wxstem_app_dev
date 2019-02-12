export const logoffUser = state => {
  const newState = {
    logged_in: false,
    fetching: false,
    api_error: null,
    login_info: {
      data: {
        error: null,
      },
    },
  }
  return state.merge(newState)
}
export const logoffUserSuccess = state => {
  const newState = {
    logged_in: false,
    fetching: false,
    api_error: null,
    login_info: {
      data: {
        error: null,
      },
    },
  }
  return state.merge(newState)
}
export const logoffUserFailure = state => {
  const newState = {
    logged_in: false,
    fetching: false,
    api_error: null,
    login_info: {
      data: {
        error: null,
      },
    },
  }
  return state.merge(newState)
}
