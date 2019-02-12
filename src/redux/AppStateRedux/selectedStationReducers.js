export const setSelectedStation = (state, action) => {
  console.log('set selected station', action)
  const newState = {
    selected_station: {
      id: action.id,
    },
  }
  return state.merge(newState)
}
