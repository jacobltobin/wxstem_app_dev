import React, { Component } from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { NavigationEvents } from 'react-navigation'
import { StationSelectors } from '../../redux/StationsRedux'

import { View, TouchableOpacity, Text } from 'react-native'
import { Header, Icon } from 'react-native-elements'
import { HeaderCenter, HeaderLeft } from '../../components'
import Styles from '../Dashboard/DashboardStyles'
import Colors from '../../themes/Colors'
import MapView, { PROVIDER_GOOGLE, Marker, UrlTile } from 'react-native-maps'
import { Images } from '../../themes'
import WeatherOverlay from '../../lib/WeatherOverlay'

class Map extends Component {
  static propTypes = {
    stations: PropTypes.array,
  }
  constructor(props) {
    super(props)
    this.state = {
      bolts: [],
      initialRegion: {
        latitude: 26.8131895,
        longitude: -79.5132406,
        latitudeDelta: 15,
        longitudeDelta: 15,
      },
      region: null,
      following: false,
      lightning_visible: false,
      url_template:
        // 'https://api.weather.com/v2/TileServer/tile/clouds?ts=1550111400&xyz={x}{y}{z}&apiKey=7bc857c51961635ab71f9e9f15634a70',
        'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
      // &xyz=' + xyz + '&apiKey=' + self.apiKey
      // url_template: self.baseEndPoint + 'tile/' + layer + '?ts=' + ts + '&fts=' + fts + '&xyz=' + xyz + '&apiKey=' + self.apiKey;
    }
    this.wss = null

    // this.weather_overlay = new WeatherOverlay()
  }

  receive_data = e => {
    console.tron.log('bolt')
    const now = new Date()
    const data = {
      ...JSON.parse(e.data),
      date: now,
      status: 'marker_red',
    }
    const fodder = [...this.state.bolts, data]
    let display_bolts = []
    fodder.forEach(bolt => {
      const time_since = now.getTime() - bolt.date.getTime()
      if (time_since < 60000) {
        if (bolt.status === 'marker_red' && time_since > 10000) {
          bolt.status = 'marker_yellow'
        }
        if (bolt.status === 'marker_yellow' && time_since > 30000) {
          bolt.status = 'marker_green'
        }
        display_bolts.push(bolt)
      }
    })
    let region = {
      latitude: data.lat,
      longitude: data.lng,
      latitudeDelta: 25,
      longitudeDelta: 25,
    }
    this.setState({
      bolts: display_bolts,
    })

    if (this.state.following) {
      this.mapView.animateToRegion(region, 1000)
    }

    // var bolt = $.parseJSON(e.data);
    // bolt properties
    // latitude, longitude, peakCurrent, icHeight, numSensors, time
    // handler(bolt);
  }
  connect_socket = () => {
    this.wss = new WebSocket('wss://websockets.weatherstem.com?target=zapmap')
    this.wss.onmessage = e => this.receive_data(e)
  }
  disconnect_socket = () => {
    this.wss.close()
  }

  list_bolts = () => {
    return this.state.bolts.map((bolt, index) => (
      <Marker
        coordinate={{ latitude: bolt.lat, longitude: bolt.lng }}
        title={bolt.type + ' ' + bolt.magnitude + ' ' + bolt.date}
        image={Images[bolt.status]}
      />
      // TYPE: {item.type}, LAT: {item.lat}, LNG: {item.lng}, MAG:{' '}
      // {item.magnitude}
    ))
  }
  list_stations = () => {
    return this.props.stations.map((station, index) => (
      <Marker
        coordinate={{ latitude: station.geo.lat, longitude: station.geo.lng }}
        title={station.name}
        image={Images['logoIconSmall']}
      />
      // TYPE: {item.type}, LAT: {item.lat}, LNG: {item.lng}, MAG:{' '}
      // {item.magnitude}
    ))
  }
  set_following = () => {
    this.setState({
      following: !this.state.following,
    })
  }
  toggle_socket = () => {
    this.state.lightning_visible
      ? this.disconnect_socket()
      : this.connect_socket()
    this.setState({
      lightning_visible: !this.state.lightning_visible,
      bolts: [],
    })
  }
  render() {
    // this.weather_overlay.consolelog()
    return (
      <View style={Styles.dashboardContainer}>
        <Header
          innerContainerStyles={Styles.headerInnerContainer}
          outerContainerStyles={Styles.headerOuterContainer}
          backgroundColor={Colors.blue.toString()}
          leftComponent={<HeaderLeft icon="menu" action={() => {}} />}
          centerComponent={<HeaderCenter title="WeatherSTEM Map" />}
        />
        <NavigationEvents
          onWillBlur={() => {
            if (this.wss) {
              this.disconnect_socket()
            }
          }}
          onWillFocus={() => {
            // this.connect_socket()
          }}
        />
        <MapView
          ref={ref => (this.mapView = ref)}
          provider={PROVIDER_GOOGLE}
          // provider={PROVIDER_DEFAULT}
          style={{
            width: '100%',
            height: '100%',
          }}
          initialRegion={this.state.initialRegion}
          region={this.state.region}
        >
          {/* <UrlTile
            urlTemplate={
              'https://api.weather.com/v2/TileServer/tile/clouds?ts=1550113200&xyz={x}{y}{z}&apiKey=7bc857c51961635ab71f9e9f15634a70'
            }
          /> */}
          {this.list_stations()}
          {this.list_bolts()}
        </MapView>
        <View
          style={{
            position: 'absolute',
            top: 80,
            right: 20,
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              height: 50,
              width: 50,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              borderBottomRightRadius: 25,
              borderBottomLeftRadius: 25,
              backgroundColor: this.state.following ? Colors.blue : 'white',
            }}
            onPress={() => {
              this.toggle_socket()
            }}
          >
            <Icon
              type="font-awesome"
              name="bullseye"
              color={this.state.following ? 'white' : Colors.blue}
              size={25}
            />
          </TouchableOpacity>
          <Text
            style={{ textAlign: 'center', fontSize: 12, color: Colors.blue }}
          >
            {'\n '}Lightning
          </Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    stations: StationSelectors.selectStationsStrippedList(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // login_user: event => dispatch(APIActions.loginUser(event)),
    // create_user: event => dispatch(APIActions.createUser(event)),
    // clear_log_in_error: event => dispatch(APIActions.clearLogInError(event)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)
