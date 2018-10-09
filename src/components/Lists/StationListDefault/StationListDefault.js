import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  SectionList,
} from 'react-native'
import { SearchBar, ButtonGroup } from 'react-native-elements'
import StationListDefaultItem from './StationListDefaultItem'
import Styles from './StationListDefaultStyles'
import { Colors } from '../../../themes'

export default class StationListDefault extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    isFetching: PropTypes.bool,
    stations: PropTypes.array,
    sectionedStations: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {
      filtering: false,
      filterText: null,
      filteredStations: null,
      sortOption: 0,
      expandKey: {
        all: false,
      },
    }
  }

  updateSortOption(sortOption) {
    this.setState({ sortOption })
  }

  onChangeTextFunction = text => {
    this.setState({
      filterText: text,
    })
    this.searchFilterFunction(text)
  }

  searchFilterFunction = text => {
    const newData = this.props.stations.filter(item => {
      const itemData = `${item.name.toUpperCase()}`
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      filteredStations: this.createSectionedStations(newData),
      filtering: true,
    })
  }

  clear = () => {
    this.search.clear()
  }

  onCancelFunction = () => {
    this.setState({
      filteredStations: this.props.sectionedStations,
      filtering: false,
    })
  }

  onClearTextFunction = () => {
    console.tron.log('hello?')
    this.setState({
      filteredStations: this.props.sectionedStations,
      filtering: false,
    })
  }

  alphabetizeSections = sections => {
    function compare(a, b) {
      if (a.title < b.title) return -1
      if (a.title > b.title) return 1
      return 0
    }
    sections.sort(compare)
    return sections
  }

  checkForProperty = (array, property, value) => {
    const checkObj = {
      binary: false,
      index: null,
    }
    for (var i = 0, j = array.length; i < j; i++) {
      if (array[i][property] === value) {
        checkObj.binary = true
        checkObj.index = i
      } else {
        return
      }
    }
    return checkObj
  }

  createSectionedStations = stations => {
    const data = []
    const sectionIndex = []
    stations.forEach(station => {
      const stationIndex = sectionIndex.indexOf(station.state)
      if (stationIndex > -1) {
        data[stationIndex].data.push(station)
      } else {
        const entry = Object.create({
          title: station.state,
          data: [station],
        })
        data.push(entry)
        sectionIndex.push(station.state)
      }
    })
    return this.alphabetizeSections(data)
  }

  renderHeader = () => {
    // const buttons = ['By State', 'By Proximity']
    return (
      <View style={Styles.filterHeader}>
        <SearchBar
          ref={search => (this.search = search)}
          placeholder="Search"
          lightTheme
          clearIcon={{ onPress: this.clear }}
          platform="default"
          round
          onChangeText={text => this.onChangeTextFunction(text)}
          onClearText={this.onClearTextFunction}
          onCancel={this.onCancelFunction}
          autoCorrect={false}
        />
      </View>
    )
  }

  render() {
    const isFetching = this.props.isFetching
    if (isFetching) {
      return (
        <View style={Styles.loadingIconContainer}>
          <ActivityIndicator size="large" color={Colors.blue} />
        </View>
      )
    } else if (!isFetching && this.props.stations == null) {
      return <Text>Starting Load...</Text>
    } else {
      console.tron.log(this.props)
      return (
        <SectionList
          renderItem={({ item }) => (
            <StationListDefaultItem
              expandKey={this.state.expandKey}
              station={item}
              navigation={this.props.navigation}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={Styles.sectionHeader}>
              <Text>{title}</Text>
            </View>
          )}
          // sections={
          //   this.state.filtering
          //     ? this.state.filteredStations
          //     : this.props.sectionedStations
          // }
          sections={this.props.sectionedStations}
          keyExtractor={(item, index) => item + index}
          ListHeaderComponent={this.renderHeader}
          initialNumToRender={10}
        />
      )
    }
  }
}
