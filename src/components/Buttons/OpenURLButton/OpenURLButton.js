import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Linking, TouchableOpacity, View, Text } from 'react-native'

export default class OpenURLButton extends Component {
  static propTypes = {
    url: PropTypes.string,
    text: PropTypes.string,
    style: PropTypes.object,
  }
  handleClick = () => {
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url)
      } else {
        console.log("Don't know how to open URI: " + this.props.url)
      }
    })
  }
  render() {
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <View>
          <Text style={this.props.style}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
