export const addDashboardStation = (state, action) => {
  const { id } = action
  const station = {
    id: id,
    key: state.dashboard_stations.length + 1,
  }
  const newState = {
    dashboard_stations: [...state.dashboard_stations, station],
  }
  return state.merge(newState)
}

export const removeDashboardStation = (state, action) => {
  const { id } = action
  const prevIndex = state.dashboard_stations.findIndex(item => item.id === id)
  const newData = [...state.dashboard_stations]
  newData.splice(prevIndex, 1)
  newNewData = []
  newData.forEach((item, i) => {
    newNewData.push({
      id: item.id,
      key: i + 1,
    })
  })
  const newState = {
    dashboard_stations: newNewData,
  }
  return state.merge(newState)
}
