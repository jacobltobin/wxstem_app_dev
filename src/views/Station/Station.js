import React, { Component } from 'react'
import { AllHtmlEntities } from 'html-entities'
import {
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { AppStateSelectors } from '../../redux/AppStateRedux'
import { StationSelectors } from '../../redux/StationsRedux'
import WeatherDataActions, {
  WeatherDataSelectors,
} from '../../redux/WeatherDataRedux'
import { sensorArrayFromObject } from '../../transforms/apiTransforms'

import { Header } from 'react-native-elements'
import { HeaderCenter, HeaderLeft } from '../../components'
import Swiper from 'react-native-swiper'

import { Colors } from '../../themes'
import Styles from './StationStyles'

class Station extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    station_base_data: PropTypes.object,
    current_data: PropTypes.object,
    request_current: PropTypes.func,
  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.refreshData()
  }
  refreshData = () => {
    this.props.request_current(
      this.props.station_base_data.handle,
      this.props.station_base_data.domain.handle,
      this.props.station_base_data.id,
    )
  }
  list_wxstem_sensors = () => {
    let colors = ['#e9e9e9', '#e1e1e1']
    return (
      <FlatList
        data={sensorArrayFromObject(this.props.current_data.wxstem.data)}
        renderItem={({ item, index }) => (
          <View
            style={{
              padding: 5,
              backgroundColor: colors[index % colors.length],
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={Styles.sensor_label}>{item.sensor_name}:</Text>
            <Text>
              {item.value} {AllHtmlEntities.decode(item.units)}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => item.id}
      />
    )
  }
  render() {
    let sensorList
    // there is no current data entry for this station
    if (!this.props.current_data) {
      sensorList = (
        <View>
          <ActivityIndicator
            size="large"
            style={{ paddingTop: 20 }}
            color={Colors.white}
          />
        </View>
      )
    }
    // there is current data and it's not fetching new data
    // and it has been over a minute since last fetching
    else if (
      this.props.current_data &&
      !this.props.current_data.wxstem.fetching &&
      this.props.current_data.wxstem.last_fetched - new Date().getTime > 60000
    ) {
    }

    // we are currently fetching new current data and there is none
    // previously fetched to display for now

    // there is current data fetched to display and there is no error
    else if (
      !this.props.current_data.wxstem.error &&
      this.props.current_data.wxstem.fetched
    ) {
      sensorList = <View>{this.list_wxstem_sensors()}</View>
    }

    goBack = () => {
      const backAction = NavigationActions.back()
      this.props.navigation.dispatch(backAction)
    }
    return (
      <View>
        <Header
          innerContainerStyles={Styles.headerInnerContainer}
          outerContainerStyles={Styles.headerOuterContainer}
          backgroundColor={Colors.blue.toString()}
          leftComponent={<HeaderLeft icon="arrow-back" action={goBack} />}
          centerComponent={
            <HeaderCenter title={this.props.station_base_data.name} />
          }
        />
        <ScrollView style={{ paddingBottom: 100 }}>
          <View>
            <Swiper style={Styles.wrapper} showsButtons>
              <View style={Styles.slide1}>
                <Image
                  style={{ height: 250, width: '100%', resizeMode: 'stretch' }}
                  source={{
                    uri:
                      'https://' +
                      this.props.station_base_data.domain.handle +
                      '.weatherstem.com/skycamera/' +
                      this.props.station_base_data.domain.handle +
                      '/' +
                      this.props.station_base_data.handle +
                      '/cumulus/snapshot.jpg',
                  }}
                />
                <Text style={Styles.text}>Hello Swiper</Text>
              </View>
              <View style={Styles.slide2}>
                <Text style={Styles.text}>Beautiful</Text>
              </View>
              <View style={Styles.slide3}>
                <Text style={Styles.text}>And simple</Text>
              </View>
            </Swiper>
          </View>
          {sensorList}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    station_base_data: StationSelectors.selectStationById(
      state,
      AppStateSelectors.selectSelectedStation(state).id,
    ),
    current_data: WeatherDataSelectors.selectCurrent(
      state,
      AppStateSelectors.selectSelectedStation(state).id,
    ),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    request_current: (handle, domainHandle, id) =>
      dispatch(WeatherDataActions.getCurrentRequest(handle, domainHandle, id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Station)
