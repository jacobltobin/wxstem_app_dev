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
import { Divider, Icon } from 'react-native-elements'
import ViewActions, { ViewSelectors } from '../../../redux/ViewRedux'
import WeatherIcon from '../../WeatherIcon/WeatherIcon'

import { Colors } from '../../../themes'
import styles from './StationListDashboardStyles'
import StationActions, {
  StationSelectors,
} from '../../../redux/APIRedux/Stations'
import Interactable from 'react-native-interactable'
import ConfigActions, { ConfigSelectors } from '../../../redux/ConfigRedux'

class StationListDashboardItem extends Component {
  static propTypes = {
    station: PropTypes.object,
    navigation: PropTypes.object,
    id: PropTypes.number,
    set_selected_station: PropTypes.func,
    remove_station_from_dashboard: PropTypes.func,
    request_one_station_current: PropTypes.func,
    request_one_station_current_sun: PropTypes.func,
    request_one_station_forecast: PropTypes.func,
    station_current_data: PropTypes.object,
    station_forecast_data: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      editing_view: false,
    }
    this.heightValue = new Animated.Value(1)
    this.deltaX = new Animated.Value(0)
  }

  componentDidMount() {
    this.refreshDataInterval = setInterval(() => this.refreshData(), 60000)
  }
  componentWillUnmount() {
    console.tron.log('will unmount')
    clearInterval(this.refreshDataInterval)
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
    this.props.request_one_station_current({
      handle: this.props.station.handle,
      domainHandle: this.props.station.domain.handle,
      id: this.props.id,
    })
    this.props.request_one_station_current_sun({
      lat: this.props.station.geo.lat,
      lng: this.props.station.geo.lng,
      id: this.props.id,
    })
  }

  render() {
    let dataContainer

    if (!this.props.station_current_data) {
      this.props.request_one_station_current({
        handle: this.props.station.handle,
        domainHandle: this.props.station.domain.handle,
        id: this.props.id,
      })
      dataContainer = (
        <View style={styles.loading_icon_container}>
          <ActivityIndicator
            size="large"
            style={{ paddingTop: 20 }}
            color={Colors.blue}
          />
        </View>
      )
    } else {
      dataContainer = (
        <View style={styles.list_item_data_container}>
          <View style={styles.list_item_temperature_container}>
            <Text style={styles.list_item_temperature}>
              {this.props.station_current_data['Thermometer'].value}
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

const mapStateToProps = (state, props) => {
  return {
    station: StationSelectors.selectStationById(state, props.id),
    station_current_data: StationSelectors.selectStationCurrentData(
      state,
      props.id,
    ),
    station_forecast_data: StationSelectors.selectStationForecastData(
      state,
      props.id,
    ),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    set_selected_station: id => dispatch(ViewActions.setSelectedStation(id)),
    remove_station_from_dashboard: id =>
      dispatch(ConfigActions.removeStationFromDashboard(id)),
    request_one_station_current: event =>
      dispatch(StationActions.requestOneStationCurrent(event)),
    request_one_station_current_sun: event =>
      dispatch(StationActions.requestOneStationCurrentSun(event)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StationListDashboardItem)
