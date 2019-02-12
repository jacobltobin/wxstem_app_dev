import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { DrawerItems, SafeAreaView } from 'react-navigation'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import LoginModal from '../Modals/LoginModal'
import UserActionTypes, { UserSelectors } from '../../redux/UserRedux'

import { Images } from '../../themes'
import styles from './DrawerContentStyles'

class DrawerContent extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    logoff_user: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      logInModalVisible: false,
    }
  }

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    })
    this.props.navigation.dispatch(navigateAction)
  }
  setLogInModalVisible(visible) {
    if (visible) {
      this.props.navigation.toggleDrawer()
    }
    this.setState({ logInModalVisible: visible })
  }

  handleLogoffPress = () => {
    this.props.logoff_user(
      this.props.user.login_info.data.uid,
      this.props.user.login_info.data.session_id,
    )
  }

  render() {
    const isLoggedIn = this.props.user.logged_in
    let loginControl
    let userName

    if (isLoggedIn) {
      loginControl = (
        <TouchableOpacity
          onPress={() => {
            this.handleLogoffPress()
            this.setLogInModalVisible(false)
          }}
        >
          <Text style={styles.drawerItem}>Log Out</Text>
        </TouchableOpacity>
      )

      userName =
        this.props.user.login_info.data.first_name +
        ' ' +
        this.props.user.login_info.data.last_name
    } else {
      loginControl = (
        <TouchableOpacity
          onPress={() => {
            this.setLogInModalVisible(true)
          }}
        >
          <Text style={styles.drawerItem}>Log In</Text>
        </TouchableOpacity>
      )

      userName = 'Guest User'
    }
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
              <Text style={styles.userName}>{userName}</Text>
            </View>
          </View>
          <DrawerItems {...this.props} />
          {loginControl}
          <View style={styles.drawerFooter}>
            <Text style={styles.drawerFooterLink}>weatherstem.com</Text>
          </View>
        </SafeAreaView>
        <LoginModal
          visible={this.state.logInModalVisible}
          close={() => this.setLogInModalVisible(false)}
        />
      </ScrollView>
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
    logoff_user: (uid, session_id) =>
      dispatch(UserActionTypes.logoffUser(uid, session_id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerContent)
