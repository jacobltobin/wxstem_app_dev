import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import PropTypes from 'prop-types'
import { Header } from 'react-native-elements'
import { Subheader } from '../../components'
import { AddStationButton } from '../../components'

// Styles
import { Colors } from '../../themes'
import Styles from './DashboardStyles'

class Dashboard extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  render() {
    // console.log(this.props.navigation)
    // const openDrawer = function() {
    //     return this.navigation.navigate("DrawerOpen")
    // }
    console.tron.log('this', Styles.headerInnerContainer)
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header
          innerContainerStyles={Styles.headerInnerContainer}
          backgroundColor={Colors.blue.toString()}
          leftComponent={{
            onPress: () => this.props.navigation.toggleDrawer(),
            icon: 'menu',
            color: '#fff',
            size: 30,
          }}
          centerComponent={{
            text: 'Dashboard',
            style: Styles.headerInnerContainer,
          }}
        />
        <ScrollView>
          <Subheader title={'Stations'} />
          <AddStationButton />

          <Subheader title={'Notifications'} />
        </ScrollView>
      </View>
    )
  }
}

export default createStackNavigator(
  {
    Dashboard: { screen: Dashboard },
  },
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
  },
)
