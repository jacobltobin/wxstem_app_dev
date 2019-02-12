export const createUser = state => {
  const newState = {
    logged_in: false,
    fetching: true,
    api_error: null,
    login_info: {
      data: {
        error: null,
      },
    },
  }
  return state.merge(newState)
}
export const createUserSuccess = (state, action) => {
  const login_info = action.login_info
  const newState = {
    logged_in: login_info.data.error ? false : true,
    fetching: false,
    api_error: login_info.data.error ? login_info.data.error : null,
    login_info: login_info,
  }
  return state.merge(newState)
}
export const createUserFailure = state => {
  const newState = {
    logged_in: false,
    fetching: false,
    api_error: 'server error',
    login_info: {
      data: {
        error: null,
      },
    },
  }
  return state.merge(newState)
}
