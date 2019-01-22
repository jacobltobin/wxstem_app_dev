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
} from 'react-native'
import { Icon } from 'react-native-elements'
import StationListDashboardItem from './StationListDashboardItem'
import { SwipeListView } from 'react-native-swipe-list-view'

import styles from './StationListDashboardStyles'
import { Colors, Metrics } from '../../../themes'

class StationListDashboard extends Component {
  static propTypes = {
    set_selected_station: PropTypes.func,
    request_all_stations: PropTypes.func,
    dashboard_stations: PropTypes.array,
    navigation: PropTypes.object,
    toggleScroll: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      // not recommended to store props in local state,
      // but here is necessary
      // because delay in redux store update causes
      // the onSwipeValueChange to be triggered
      // multiple times, deleting two items
      // instead of one
      listViewData: [...this.props.dashboard_stations],
    }
    this.animationIsRunning = false
    this.rowTranslateAnimatedValues = {}
    Array(20)
      .fill('')
      .forEach((_, i) => {
        this.rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1)
      })
    this.animatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)
  }

  clear = () => {
    this.searchbar.clear()
  }
  onClearTextFunction = () => {
    this.setState({
      noResults: false,
      filtering: false,
    })
  }
  loadStations = () => {
    this.props.request_all_stations()
  }
  getStateEntry = state => {
    let results = this.props.sectionedStations.filter(obj => {
      return obj.title === state
    })
    return results
  }

  handleStationRemoved = id => {
    // this.props.remove_station_from_dashboard(id)
  }

  handleSwipeGestureBegan = () => {
    this.props.toggleScroll(false)
  }
  handleOnRowDidOpen = () => {
    this.props.toggleScroll(true)
  }

  onSwipeValueChange = swipeData => {
    const { key, value } = swipeData
    // console.tron.log(swipeData)
    if (key == 0) {
      // console.tron.log(value)
    }
    if (value > -0.6 && value < 0.6) {
      this.props.toggleScroll(true)
    }
    if (value < -Metrics.screenWidth && !this.animationIsRunning) {
      this.animationIsRunning = true
      console.tron.log(key, 'valuechange', value)
      Animated.timing(this.rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
      }).start(() => {
        // const prevIndex = this.props.dashboard_stations.findIndex(item => item.key === key)
        // this.handleStationRemoved(
        //   this.props.dashboard_stations[prevIndex].handle,
        //   this.props.dashboard_stations[prevIndex].domainHandle
        // )
        // this.props.toggleScroll(true)
        // this.animationIsRunning = false
        // console.tron.log('isrunning', this.animationIsRunning)
        const newData = [...this.state.listViewData]
        const prevIndex = this.state.listViewData.findIndex(
          item => item.key === key,
        )
        newData.splice(prevIndex, 1)
        this.setState({ listViewData: newData })
        this.animationIsRunning = false
      })
    }
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
            // data={this.props.dashboard_stations}
            data={this.state.listViewData}
            renderItem={(data, rowMap) => {
              return (
                <this.animatedTouchable
                  style={[
                    styles.swipe_item_row_front,
                    {
                      height: this.rowTranslateAnimatedValues[
                        data.item.key
                      ].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 250],
                      }),
                    },
                  ]}
                >
                  {console.tron.log('list dashboard', data.item)}
                  <StationListDashboardItem
                    navigation={this.props.navigation}
                    id={data.item.id}
                  />
                </this.animatedTouchable>
                // <View style={styles.swipe_item_row_front}>
                //   <StationListDashboardItem
                //     handle={data.item.handle}
                //     domainHandle={data.item.domainHandle}
                //     navigation={this.props.navigation}
                //   />
                // </View>
              )
            }}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.swipe_item_row_back}>
                <View style={styles.swipe_item_remove_icon}>
                  <Icon
                    name={'trash'}
                    type={'font-awesome'}
                    size={30}
                    color={Colors.white}
                  />
                </View>
                {/* <Text style={styles.swipe_item_remove}>

                </Text> */}
              </View>
            )}
            rightOpenValue={-Metrics.screenWidth}
            onSwipeValueChange={this.onSwipeValueChange}
            swipeGestureBegan={this.handleSwipeGestureBegan}
            onRowDidOpen={this.handleOnRowDidOpen}
            scrollEnabled={false}
            disableRightSwipe
            friction={7}
          />
          {/* <FlatList
            data={this.props.dashboard_stations}
            renderItem={({ item }) => (
              <StationListDashboardItem
                handle={item.handle}
                domainHandle={item.domainHandle}
                navigation={this.props.navigation}
              />
            )}
          /> */}
        </View>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    dashboard_stations: ConfigSelectors.selectDashboardStations(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    request_all_stations: () => dispatch(StationActions.requestAllStations()),
    set_selected_station: id => dispatch(ViewActions.setSelectedStation(id)),
    remove_station_from_dashboard: id =>
      dispatch(ConfigActions.removeStationFromDashboard(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StationListDashboard)
