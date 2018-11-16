import React, { Component } from 'react'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import PropTypes from 'prop-types'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Images } from '../../themes'
import LoginModal from '../Modals/LoginModal'

import styles from './DrawerContentStyles'

export default class DrawerContent extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
    }
  }

  setModalVisible(visible) {
    if (visible) {
      this.props.navigation.toggleDrawer()
    }
    this.setState({ modalVisible: visible })
  }

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    })
    this.props.navigation.dispatch(navigateAction)
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.drawerHeader}>
            <View style={styles.userImageContainer}>
              <Image
                source={Images.user}
                style={styles.userImage}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.userMetaContainer}>
              <Text style={styles.userLabel}>logged in as</Text>
              <Text style={styles.userName}>guest user</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true)
            }}
          >
            <Text style={styles.drawerItem}>Log In</Text>
          </TouchableOpacity>
          <DrawerItems {...this.props} />
          <View style={styles.drawerFooter}>
            <Text style={styles.drawerFooterLink}>weatherstem.com</Text>
          </View>
        </SafeAreaView>
        <LoginModal
          visible={this.state.modalVisible}
          setModalVisible={visible => this.setModalVisible(visible)}
        />
      </ScrollView>
    )
  }
}
