import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View, TouchableOpacity, Image, Text } from 'react-native'
import Modal from 'react-native-modal'
import { LogInForm } from '../../'
import { Icon, Divider } from 'react-native-elements'

import { Images } from '../../../themes'
import styles from './LogInModalStyles'

export default class LoginModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    setModalVisible: PropTypes.func,
  }
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: this.props.visible,
    }
  }

  onSuccess = () => {
    this.props.setModalVisible(false)
  }

  render() {
    return (
      <Modal
        animationIn={'slideInUp'}
        animationInTiming={300}
        backdropColor={'black'}
        backdropOpacity={0.85}
        backdropTransitionInTiming={500}
        isVisible={this.props.visible}
        onBackButtonPress={() => {
          this.props.setModalVisible(false)
        }}
        onBackdropPress={() => {
          this.props.setModalVisible(false)
        }}
      >
        <View style={styles.modal_inner_container}>
          <View style={styles.modal_header}>
            <TouchableOpacity
              style={styles.modal_close}
              onPress={() => {
                this.props.setModalVisible(false)
              }}
            >
              <Icon name="close" size={30} color="#000" />
            </TouchableOpacity>
          </View>
          {/* <Divider style={{ backgroundColor: 'lightgray' }} /> */}
          <View style={styles.login_LogoContainer}>
            <Image
              source={Images.logoIconTypeColorHorizontal}
              style={styles.login_Logo}
              resizeMode="center"
            />
          </View>
          <LogInForm onSuccess={this.onSuccess} />
          <TouchableOpacity style={styles.login_signUpButton}>
            <Text style={styles.login_signUpButtonText}>
              No Account? Sign up.
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}
