import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Icon } from 'react-native-elements'
import WeatherIcon from '../../WeatherIcon/WeatherIcon'

import { Colors } from '../../../themes'
import styles from './StationListDashboardStyles'
import { StationSelectors } from '../../../redux/StationsRedux'
import WeatherDataActions, {
  WeatherDataSelectors,
} from '../../../redux/WeatherDataRedux'
import Interactable from 'react-native-interactable'
import AppStateActions from '../../../redux/AppStateRedux'
import { createLoadingSelector } from '../../../redux/LoadingRedux'

class StationListDashboardItem extends Component {
  static propTypes = {
    station: PropTypes.object,
    navigation: PropTypes.object,
    id: PropTypes.number,
    set_selected_station: PropTypes.func,
    remove_station_from_dashboard: PropTypes.func,
    request_current: PropTypes.func,
    station_current_data: PropTypes.object,
    fetching_current: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      editing_view: false,
      interval_set: false,
      has_blurred: false,
    }
    this.heightValue = new Animated.Value(1)
    this.deltaX = new Animated.Value(0)
  }

  componentDidMount() {
    this.refreshData()
    this.setRefreshInterval()
  }
  componentWillUnmount() {
    this.clearRefreshInterval()
  }
  clearRefreshInterval() {
    this.setState({
      interval_set: false,
    })
    clearInterval(this.refreshDataInterval)
  }
  setRefreshInterval() {
    this.setState({
      interval_set: true,
    })
    this.refreshDataInterval = setInterval(() => this.refreshData(), 60000)
  }
  goToStation = id => {
    this.props.set_selected_station(id)
    this.props.navigation.navigate('Station', { transition: 'slideFromBottom' })
  }
  handleRemovePress = id => {
    Animated.timing(this.heightValue, {
      toValue: 0,
      duration: 200,
    }).start(() => {
      this.props.remove_station_from_dashboard(id)
    })
  }
  handleLongPress = (handle, domainHandle) => {
    this.setState({
      editing_view: true,
    })
  }
  refreshData = () => {
    this.props.request_current(
      this.props.station.handle,
      this.props.station.domain.handle,
      this.props.id,
    )
  }

  render() {
    let dataContainer

    // there is no current data entry for this station
    if (!this.props.station_current_data) {
      dataContainer = (
        <View style={styles.loading_icon_container}>
          <ActivityIndicator
            size="large"
            style={{ paddingTop: 20 }}
            color={Colors.white}
          />
        </View>
      )
    }
    // there is current data and it's not fetching new data
    // but it has been over a minute since last fetching
    else if (
      this.props.station_current_data &&
      !this.props.station_current_data.wxstem.fetching &&
      this.props.station_current_data.wxstem.last_fetched - new Date().getTime >
        60000
    ) {
      this.refreshData()
      dataContainer = (
        <View style={styles.loading_icon_container}>
          <ActivityIndicator
            size="large"
            style={{ paddingTop: 20 }}
            color={Colors.white}
          />
        </View>
      )
    }
    // we are currently fetching new current data and there is none
    // previously fetched to display for now
    else if (
      this.props.station_current_data.wxstem.fetching &&
      !this.props.station_current_data.wxstem.fetched
    ) {
      dataContainer = (
        <View style={styles.loading_icon_container}>
          <ActivityIndicator
            size="large"
            style={{ paddingTop: 20 }}
            color={Colors.white}
          />
        </View>
      )
    }
    // there is current data fetched to display and there is no error
    else if (
      !this.props.station_current_data.wxstem.error &&
      this.props.station_current_data.wxstem.fetched
    ) {
      dataContainer = (
        <View style={styles.list_item_data_container}>
          <View style={styles.list_item_temperature_container}>
            <Text style={styles.list_item_temperature}>
              {this.props.station_current_data.wxstem.data['Thermometer'].value}
            </Text>
            <Text style={styles.list_item_temperature_super}>˚F</Text>
          </View>
          <View style={styles.weather_icon_container}>
            <WeatherIcon name={'thunder'} />
          </View>
          <View style={styles.list_item_forecast_list_container}>
            <View style={styles.list_item_forecast_item_container}>
              <Text style={styles.list_item_forecast_item_time}>3PM</Text>
              <Text style={styles.list_item_forecast_item_value}>50˚F</Text>
            </View>
            <View style={styles.list_item_forecast_item_container}>
              <Text style={styles.list_item_forecast_item_time}>4PM</Text>
              <Text style={styles.list_item_forecast_item_value}>48˚F</Text>
            </View>
            <View style={styles.list_item_forecast_item_container}>
              <Text style={styles.list_item_forecast_item_time}>5PM</Text>
              <Text style={styles.list_item_forecast_item_value}>47˚F</Text>
            </View>
            <View style={styles.list_item_forecast_item_container}>
              <Text style={styles.list_item_forecast_item_time}>6PM</Text>
              <Text style={styles.list_item_forecast_item_value}>45˚F</Text>
            </View>
            <View style={styles.list_item_forecast_item_container}>
              <Text style={styles.list_item_forecast_item_time}>7PM</Text>
              <Text style={styles.list_item_forecast_item_value}>44˚F</Text>
            </View>
          </View>
        </View>
      )
    }
    let editing_controls
    if (this.state.editing_view) {
      editing_controls = (
        <View style={styles.list_item_editing_container}>
          <TouchableOpacity>
            <Icon
              name={'move'}
              type={'font-awesome'}
              size={40}
              color={Colors.red}
            />
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <Animated.View
        style={[
          {
            height: this.heightValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 250],
            }),
            marginRight: this.heightValue.interpolate({
              inputRange: [0, 1],
              outputRange: [250, 0],
            }),
            paddingRight: 8,
            paddingLeft: 8,
            marginTop: 10,
            marginBottom: 4,
            overflow: 'hidden',
          },
        ]}
      >
        <NavigationEvents
          onWillBlur={() => {
            this.clearRefreshInterval()
            this.setState({
              has_blurred: true,
            })
          }}
          onWillFocus={() => {
            if (this.state.has_blurred) {
              this.setRefreshInterval()
            }
          }}
        />
        <Interactable.View
          style={styles.rowFrontContainer}
          horizontalOnly
          snapPoints={[{ x: 0 }, { x: -60 }]}
          animatedValueX={this.deltaX}
        >
          <View style={styles.list_item_round_container}>
            <TouchableOpacity
              // onLongPress={() => {
              //   this.handleLongPress()
              // }}
              onPress={() => {
                this.goToStation(this.props.station.id)
              }}
              activeOpacity={0.9}
            >
              <View style={styles.list_item_container}>
                <View style={styles.list_item_info_container}>
                  <View style={styles.list_item_name_container}>
                    <Text style={styles.list_item_station_name_text}>
                      {this.props.station.name}
                    </Text>
                  </View>
                  {dataContainer}
                </View>
                {editing_controls}
                <View style={styles.list_item_image_container}>
                  <Image
                    style={styles.list_item_image}
                    source={{
                      uri:
                        'https://' +
                        this.props.station.domain.handle +
                        '.weatherstem.com/skycamera/' +
                        this.props.station.domain.handle +
                        '/' +
                        this.props.station.handle +
                        '/cumulus/snapshot.jpg',
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Interactable.View>
        <View style={styles.swipe_item_row_back}>
          <Animated.View
            style={[
              styles.swipe_item_remove_button_container,
              {
                transform: [
                  {
                    scale: this.deltaX.interpolate({
                      inputRange: [-100, -100, 0, 0],
                      outputRange: [2, 2, 0, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              delayPressIn={50}
              style={styles.swipe_item_remove_button}
              onPress={() => {
                this.handleRemovePress(this.props.station.id)
              }}
            >
              <Icon
                name={'minus'}
                type={'font-awesome'}
                size={20}
                color={Colors.white}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    )
  }
}

const loadingSelector = createLoadingSelector(['GET_CURRENT'])

const mapStateToProps = (state, props) => {
  return {
    station: StationSelectors.selectStationById(state, props.id),
    station_current_data: WeatherDataSelectors.selectCurrent(state, props.id),
    fetching_current: loadingSelector(state),
    // station_forecast_data: StationSelectors.selectStationForecastData(
    //   state,
    //   props.id,
    // ),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    set_selected_station: id =>
      dispatch(AppStateActions.setSelectedStation(id)),
    remove_station_from_dashboard: id =>
      dispatch(AppStateActions.removeDashboardStation(id)),
    request_current: (handle, domainHandle, id) =>
      dispatch(WeatherDataActions.getCurrentRequest(handle, domainHandle, id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StationListDashboardItem)
