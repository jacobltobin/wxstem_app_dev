import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native'
import StationListDefaultItem from './StationListDefaultItem'
import styles from './StationListDefaultStyles'
import { Colors } from '../../../themes'

export default class StationListDefault extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    stationsArray: PropTypes.array,
    navigation: PropTypes.object,
  }

  render() {
    const isFetching = this.props.isFetching
    if (isFetching) {
      return (
        <View style={styles.loadingIconContainer}>
          <ActivityIndicator size="large" color={Colors.blue} />
        </View>
      )
    } else if (!isFetching && this.props.stationsArray == null) {
      return <Text>Starting Load...</Text>
    } else {
      return (
        <FlatList
          data={this.props.stationsArray}
          renderItem={({ item }) => <StationListDefaultItem station={item} />}
        />
        // <ScrollView style={styles.listContainer}>
        //   {this.props.stationsArray.map(station => (
        //     <StationListDefaultItem station={station} />
        //   ))}
        // </ScrollView>
      )
    }
  }
}
