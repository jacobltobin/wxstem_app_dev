export const loginUser = state => {
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
// successful REQUEST not necessarily successful login
export const loginUserSuccess = (state, action) => {
  const login_info = action.login_info
  const newState = {
    logged_in: login_info.data.error ? false : true,
    fetching: false,
    api_error: login_info.data.error ? login_info.data.error : null,
    login_info: login_info,
  }
  return state.merge(newState)
}
export const loginUserFailure = state => {
  const newState = {
    logged_in: false,
    fetching: false,
    login_info: {
      data: {
        error: null,
      },
    },
  }
  return state.merge(newState)
}
