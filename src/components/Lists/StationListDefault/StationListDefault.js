import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, ActivityIndicator, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements'
import StationListDefaultItem from './StationListDefaultItem'
import Styles from './StationListDefaultStyles'
import { Colors } from '../../../themes'

export default class StationListDefault extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    isFetching: PropTypes.bool,
    stationsArray: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {
      filtering: false,
      filteredStations: this.props.stationsArray,
    }
  }

  searchFilterFunction = text => {
    const newData = this.props.stationsArray.filter(item => {
      const itemData = `${item.name.toUpperCase()}`
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({ filteredStations: newData, filtering: true })
  }

  renderHeader = () => {
    return (
      <View style={Styles.filterHeader}>
        <SearchBar
          placeholder="Search"
          lightTheme
          round
          onChangeText={text => this.searchFilterFunction(text)}
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
    } else if (!isFetching && this.props.stationsArray == null) {
      return <Text>Starting Load...</Text>
    } else {
      return (
        <FlatList
          data={
            this.state.filtering
              ? this.state.filteredStations
              : this.props.stationsArray
          }
          renderItem={({ item }) => (
            <StationListDefaultItem
              station={item}
              navigation={this.props.navigation}
            />
          )}
          ListHeaderComponent={this.renderHeader}
        />
      )
    }
  }
}
