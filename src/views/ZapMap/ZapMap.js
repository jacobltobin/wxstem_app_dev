import React, { Component } from 'react'
import { WebView } from 'react-native'

import PropTypes from 'prop-types'
import { createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { UserSelectors } from '../../redux/UserRedux'

import WeatherIcon from '../../components/WeatherIcon/WeatherIcon'
import { StationListDashboard } from '../../components'
import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import { Header, Icon } from 'react-native-elements'
import {
  SelectStationModal,
  Subheader,
  HeaderCenter,
  HeaderLeft,
} from '../../components'
import Styles from '../Dashboard/DashboardStyles'
import Colors from '../../themes/Colors'
import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Marker,
  UrlTile,
} from 'react-native-maps'
import { Images } from '../../themes'
import WeatherOverlay from '../../lib/WeatherOverlay'

export default class ZapMap extends Component {
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
      url_template:
        // 'https://api.weather.com/v2/TileServer/tile/clouds?ts=1550111400&xyz={x}{y}{z}&apiKey=7bc857c51961635ab71f9e9f15634a70',
        'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
      // &xyz=' + xyz + '&apiKey=' + self.apiKey
      // url_template: self.baseEndPoint + 'tile/' + layer + '?ts=' + ts + '&fts=' + fts + '&xyz=' + xyz + '&apiKey=' + self.apiKey;
    }

    this.weather_overlay = new WeatherOverlay()
    this.wss = new WebSocket('wss://websockets.weatherstem.com')
    this.wss.onmessage = e => {
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
  set_following = () => {
    this.setState({
      following: !this.state.following,
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
          centerComponent={<HeaderCenter title="ZapMap" />}
        />
        {/* <WebView
          source={{
            uri: 'https://leon.weatherstem.com/modules/zapmap/zapmap.html',
          }}
          style={{ marginTop: 20, height: 300 }}
        /> */}
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
          <UrlTile
            urlTemplate={
              'https://api.weather.com/v2/TileServer/tile/clouds?ts=1550113200&xyz={x}{y}{z}&apiKey=7bc857c51961635ab71f9e9f15634a70'
            }
          />
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
              this.set_following()
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
            Follow{'\n '}Lightning
          </Text>
        </View>
      </View>
    )
  }
}
