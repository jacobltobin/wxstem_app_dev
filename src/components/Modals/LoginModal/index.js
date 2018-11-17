import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View, TouchableOpacity, Image, Text } from 'react-native'
import Modal from 'react-native-modal'
import { LogInForm } from '../../'
import { Icon } from 'react-native-elements'

import { Images } from '../../../themes'
import styles from './LogInModalStyles'

export default class LoginModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    close: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      creatingAccount: false,
    }
  }

  onSuccess = () => {
    this.props.close()
  }

  render() {
    return (
      <Modal
        animationIn={'fadeInRightBig'}
        animationInTiming={400}
        animationOut={'fadeOutDownBig'}
        animationOutTiming={400}
        backdropColor={'black'}
        backdropOpacity={0.85}
        backdropTransitionInTiming={200}
        isVisible={this.props.visible}
        avoidKeyboard
        onBackButtonPress={() => {
          this.props.close()
        }}
        onBackdropPress={() => {
          this.props.close()
        }}
      >
        <View style={styles.modal_inner_container}>
          <View style={styles.modal_header}>
            <TouchableOpacity
              style={styles.modal_close}
              onPress={() => {
                this.props.close()
              }}
            >
              <Icon name="close" size={30} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.login_LogoContainer}>
            <Image
              source={Images.logoIconTypeColorHorizontal}
              style={styles.login_Logo}
              resizeMode="center"
            />
          </View>
          <LogInForm
            onSuccess={this.onSuccess}
            creatingAccount={this.state.creatingAccount}
          />
          <TouchableOpacity
            style={styles.login_signUpButton}
            onPress={() => {
              this.setState({
                creatingAccount: true,
              })
            }}
          >
            <Text style={styles.login_signUpButtonText}>
              No Account? Sign up.
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}
