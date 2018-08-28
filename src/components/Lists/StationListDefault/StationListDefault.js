import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView } from 'react-native'
import StationListDefaultItem from './StationListDefaultItem'
import styles from './StationListDefaultStyles'

export default class StationListDefault extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    stationsArray: PropTypes.array,
  }

  render() {
    console.tron.log(this.props)
    const isFetching = this.props.isFetching
    if (isFetching) {
      return <Text>Loading...</Text>
    } else if (!isFetching && this.props.stationsArray == null) {
      return <Text>Starting Load...</Text>
    } else {
      return (
        <ScrollView style={styles.listContainer}>
          {this.props.stationsArray.map(station => (
            <StationListDefaultItem station={station} />
          ))}
        </ScrollView>
      )
    }
  }
}
