import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, ActivityIndicator, SectionList } from 'react-native'
import { SearchBar, ButtonGroup } from 'react-native-elements'
import StationListDefaultItem from './StationListDefaultItem'
import { abbreviationToFullName } from '../../../transforms/stateNameUtils'
import * as apiTransforms from '../../../transforms/apiTransforms'

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
      filterText: '',
      filteredStations: this.props.sectionedStations,
      sortOption: 0,
      noResults: null,
    }
  }

  onChangeTextFunction = text => {
    this.setState({
      filterText: text,
    })
    this.searchFilterFunction(text)
  }

  searchFilterFunction = text => {
    const newData = this.props.stations.filter(item => {
      const itemName = `${item.name.toUpperCase()}`
      const itemDomain = `${item.domain.toUpperCase()}`
      const textData = text.toUpperCase()
      if (itemName.indexOf(textData) < 0 && itemDomain.indexOf(textData) < 0) {
        return false
      }
      return true
    })
    if (newData.length === 0) {
      this.setState({
        filteredStations: this.props.sectionedStations,
        filtering: false,
        noResults: true,
      })
    } else {
      this.setState({
        filteredStations: apiTransforms.createSectionedStations(newData),
        filtering: true,
        noResults: false,
      })
    }
  }

  clear = () => {
    this.searchbar.clear()
  }

  onClearTextFunction = () => {
    this.setState({
      filteredStations: this.props.sectionedStations,
      filtering: false,
    })
  }

  renderHeader = () => {
    return (
      <View style={Styles.filterHeader}>
        <SearchBar
          ref={ref => (this.searchbar = ref)}
          placeholder="Search"
          lightTheme
          clearIcon={{ onPress: this.clear }}
          platform="default"
          round
          value={this.state.filterText}
          onChangeText={text => this.onChangeTextFunction(text)}
          onClear={this.onClearTextFunction}
          autoCorrect={false}
        />
        <View
          style={
            this.state.noResults ? Styles.noResults : Styles.noResultsHidden
          }
        >
          <Text style={Styles.noResultsText}>
            No stations match your search...
          </Text>
        </View>
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
      return (
        <View style={{ paddingBottom: 70 }}>
          <SectionList
            renderItem={({ item }) => (
              <StationListDefaultItem
                station={item}
                hidden={this.state.noResults}
                navigation={this.props.navigation}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View
                style={
                  this.state.noResults
                    ? Styles.noResultsHidden
                    : Styles.sectionHeader
                }
              >
                <Text>{abbreviationToFullName(title).toUpperCase()}</Text>
              </View>
            )}
            sections={
              this.state.filteredStations === null
                ? this.props.sectionedStations
                : this.state.filteredStations
            }
            keyExtractor={(item, index) => item + index}
            ListHeaderComponent={this.renderHeader}
            initialNumToRender={10}
          />
        </View>
      )
    }
  }
}
