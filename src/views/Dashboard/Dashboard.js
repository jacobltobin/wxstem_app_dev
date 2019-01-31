import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { UserSelectors } from '../../redux/APIRedux/User'

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

// Styles
import { Colors } from '../../themes'
import Styles from './DashboardStyles'

class Dashboard extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      select_station_modal_visible: false,
      scrollEnabled: true,
    }
  }

  handle_add_station_press = () => {
    this.setState({
      select_station_modal_visible: true,
    })
  }
  set_select_station_modal_visible = visible => {
    this.setState({
      select_station_modal_visible: visible,
    })
  }

  toggleScroll = bool => {
    this.setState({
      scrollEnabled: bool,
    })
  }

  render() {
    const openDrawer = () => {
      this.props.navigation.toggleDrawer()
    }

    let dashboard_station_list
    dashboard_station_list = (
      <View>
        <WeatherIcon name="cloud-night" />
        <WeatherIcon name="sunny" />
        <WeatherIcon name="frosty" />
        <WeatherIcon name="windysnow" />
        <WeatherIcon name="showers" />
        <WeatherIcon name="basecloud" />
        <WeatherIcon name="cloud" />
        <WeatherIcon name="rainy" />
        <WeatherIcon name="mist" />
        <WeatherIcon name="windysnowcloud" />
        <WeatherIcon name="drizzle" />
        <WeatherIcon name="snowy" />
        <WeatherIcon name="sleet" />
        <WeatherIcon name="moon" />
        <WeatherIcon name="windyrain" />
        <WeatherIcon name="hail" />
        <WeatherIcon name="sunset" />
        <WeatherIcon name="windyraincloud" />
        <WeatherIcon name="sunrise" />
        <WeatherIcon name="sun" />
        <WeatherIcon name="thunder" />
        <WeatherIcon name="windy" />

        <StationListDashboard
          toggleScroll={this.toggleScroll}
          navigation={this.props.navigation}
        />
        <View style={Styles.addStationButton}>
          <TouchableOpacity
            onPress={() => this.handle_add_station_press()}
            activeOpacity={0.5}
          >
            <Icon
              name={'plus-circle'}
              type={'font-awesome'}
              size={100}
              color={Colors.lightGray}
            />
            <Text style={Styles.addStationButtonText}>
              Add stations {'\n'}to your dashboard
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )

    let user_indicator
    if (this.props.user.logged_in) {
      user_indicator = (
        <View style={Styles.user_indicator}>
          <Text style={Styles.user_indicator_text}>
            Logged in as {this.props.user.login_info.data.first_name}{' '}
            {this.props.user.login_info.data.last_name}
          </Text>
        </View>
      )
    } else {
      user_indicator = ''
    }

    return (
      <View style={Styles.dashboardContainer}>
        <Header
          innerContainerStyles={Styles.headerInnerContainer}
          outerContainerStyles={Styles.headerOuterContainer}
          backgroundColor={Colors.blue.toString()}
          leftComponent={<HeaderLeft icon="menu" action={openDrawer} />}
          centerComponent={<HeaderCenter title="Dashboard" />}
        />
        {user_indicator}
        <ScrollView scrollEnabled={this.state.scrollEnabled}>
          {/* <Subheader title={'My Stations'} /> */}
          {dashboard_station_list}
          <Subheader title={'Notifications'} />
        </ScrollView>
        <SelectStationModal
          visible={this.state.select_station_modal_visible}
          close={() => this.set_select_station_modal_visible(false)}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: UserSelectors.selectLoginInfo(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // login_user: event => dispatch(APIActions.loginUser(event)),
    // create_user: event => dispatch(APIActions.createUser(event)),
    // clear_log_in_error: event => dispatch(APIActions.clearLogInError(event)),
  }
}

connectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)

export default createStackNavigator(
  {
    Dashboard: { screen: connectedDashboard },
  },
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
  },
)
