import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import StationActions, {
  StationSelectors,
} from '../../../redux/APIRedux/Stations'
import { ConfigSelectors } from '../../../redux/ConfigRedux'

import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Easing,
  FlatList,
} from 'react-native'
import { Icon } from 'react-native-elements'
import StationListDashboardItem from './StationListDashboardItem'
import Interactable from 'react-native-interactable'

import styles from './StationListDashboardStyles'
import { Colors } from '../../../themes'

class StationListDashboard extends Component {
  static propTypes = {
    request_all_stations: PropTypes.func,
    dashboard_stations: PropTypes.array,
    navigation: PropTypes.object,
    stationsFetched: PropTypes.bool,
    isFetching: PropTypes.bool,
  }

  constructor(props) {
    super(props)
  }
  clear = () => {
    this.searchbar.clear()
  }
  loadStations = () => {
    this.props.request_all_stations()
  }
  _keyExtractor = (item, index) => item.id

  render() {
    // to check if the redux is still rehydrating and indicate as much
    if (!this.props.dashboard_stations.length) {
      return (
        <View style={styles.loading_icon_container}>
          <ActivityIndicator
            size="large"
            style={{ paddingTop: 40 }}
            color={Colors.blue}
          />
          <Text style={styles.loading_text}>
            • loading your configurations •
          </Text>
        </View>
      )
    }
    // otherwise go on ahead
    else {
      return (
        <FlatList
          data={this.props.dashboard_stations}
          renderItem={({ item }) => (
            <StationListDashboardItem
              navigation={this.props.navigation}
              id={item.id}
            />
          )}
          keyExtractor={this._keyExtractor}
        />
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    dashboard_stations: ConfigSelectors.selectDashboardStations(state),
    isFetching: StationSelectors.isFetchingStations(state),
    stationsFetched: StationSelectors.stationsFetched(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    request_all_stations: () => dispatch(StationActions.requestAllStations()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StationListDashboard)
