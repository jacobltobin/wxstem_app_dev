import React, { Component } from 'react'
import { Animated, View, Text } from 'react-native'
import PropTypes from 'prop-types'

export default class Fade extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0),
    }
  }

  startAnimation = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start()
  }

  render() {
    let { fadeAnim } = this.state
    let children, modalContents
    if (this.props.visible) {
      this.startAnimation()
      children = this.props.children
      modalContents = (
        <Animated.View // Special animatable View
          style={{
            ...this.props.style,
            opacity: fadeAnim, // Bind opacity to animated value
          }}
        >
          {children}
        </Animated.View>
      )
    } else {
      modalContents = ''
    }
    return <View>{modalContents}</View>
  }
}
