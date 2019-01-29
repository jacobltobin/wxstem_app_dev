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
    toggleScroll: PropTypes.func,
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
    // if station data is not fetching and stations are not fetched then:
    if (!this.props.isFetching && this.props.stationsFetched == false) {
      return (
        <View style={styles.loading_icon_container}>
          <ActivityIndicator
            size="large"
            style={{ paddingTop: 20 }}
            color={Colors.blue}
          />
        </View>
      )
    }
    // if there is station data then:
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
