import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import StationActions, {
  StationSelectors,
} from '../../../redux/APIRedux/Stations'
import ConfigActions, { ConfigSelectors } from '../../../redux/ConfigRedux'

import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native'
import { Icon } from 'react-native-elements'
import StationListDashboardItem from './StationListDashboardItem'
import { SwipeListView } from 'react-native-swipe-list-view'

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
    remove_station_from_dashboard: PropTypes.func,
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
  handleSwipeGestureBegan = () => {
    this.props.toggleScroll(false)
  }
  handleOnRowDidOpen = () => {
    this.props.toggleScroll(true)
  }
  handleRemovePress = (id, key, rowMap) => {
    if (rowMap[key]) {
      rowMap[key].closeRow()
    }
    this.props.remove_station_from_dashboard(id)
  }

  onAnimCallback = complete => {
    this.animationIsRunning = false
  }

  render() {
    // if no station data then:
    if (this.props.stationsFetched == false && !this.props.isFetching) {
      this.loadStations()
    }
    // if station data is fetching then:
    if (this.props.isFetching) {
      return (
        <View style={styles.loading_icon_container}>
          <ActivityIndicator size="large" color={Colors.blue} />
        </View>
      )
    }
    // if station data is not fetching and stations are not fetched then:
    else if (!this.props.isFetching && this.props.stationsFetched == false) {
      return <Text>Starting Load...</Text>
    }
    // finally now, if there is station data then:
    else {
      return (
        <View>
          <SwipeListView
            useFlatList
            closeOnRowOpen
            data={this.props.dashboard_stations}
            renderItem={(data, rowMap) => {
              console.tron.log('rendering item', data.item.id)
              return (
                <View style={styles.swipe_item_row_front}>
                  <StationListDashboardItem
                    navigation={this.props.navigation}
                    id={data.item.id}
                  />
                </View>
              )
            }}
            renderHiddenItem={(data, rowMap) => {
              return (
                <View style={styles.swipe_item_row_back}>
                  <View style={styles.swipe_item_remove_icon}>
                    <TouchableOpacity
                      onPress={() => {
                        this.handleRemovePress(
                          data.item.id,
                          data.item.key,
                          rowMap,
                        )
                      }}
                    >
                      <Icon
                        name={'trash'}
                        type={'font-awesome'}
                        size={30}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }}
            rightOpenValue={-75}
            onSwipeValueChange={this.onSwipeValueChange}
            swipeGestureBegan={this.handleSwipeGestureBegan}
            onRowDidOpen={this.handleOnRowDidOpen}
            scrollEnabled={false}
            disableRightSwipe
            friction={7}
          />
        </View>
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
    remove_station_from_dashboard: id =>
      dispatch(ConfigActions.removeStationFromDashboard(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StationListDashboard)
