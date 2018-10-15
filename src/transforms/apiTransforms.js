export function alphabetizeStations(stations) {
  const sortableData = JSON.parse(JSON.stringify(stations))
  function compare(a, b) {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  }
  sortableData.sort(compare)
  return sortableData
}
export function alphabetizeSections(sections) {
  function compare(a, b) {
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  }
  sections.sort(compare)
  return sections
}
export function createSectionedStations(stations) {
  const data = []
  const sectionIndex = []
  stations.forEach(station => {
    const stationIndex = sectionIndex.indexOf(station.state)
    if (stationIndex > -1) {
      data[stationIndex].data.push(station)
    } else {
      data.push({ title: station.state, data: [station] })
      sectionIndex.push(station.state)
    }
  })
  return alphabetizeSections(data)
}
