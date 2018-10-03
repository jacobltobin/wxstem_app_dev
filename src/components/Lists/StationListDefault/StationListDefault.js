import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, ActivityIndicator, FlatList } from 'react-native'
import StationListDefaultItem from './StationListDefaultItem'
import styles from './StationListDefaultStyles'
import { Colors } from '../../../themes'

export default class StationListDefault extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    isFetching: PropTypes.bool,
    stationsArray: PropTypes.array,
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
          renderItem={({ item }) => (
            <StationListDefaultItem
              station={item}
              navigation={this.props.navigation}
            />
          )}
        />
      )
    }
  }
}
