import React, { Component } from 'react'
import { Animated, View, Text } from 'react-native'
import PropTypes from 'prop-types'

export default class FadeOutOverlay extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    style: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(1),
    }
  }

  startAnimation = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 4000,
    }).start()
  }

  render() {
    let { fadeAnim } = this.state
    if (this.props.visible) {
      this.startAnimation()
      modalContents = (
        <Animated.View // Special animatable View
          style={{
            ...this.props.style,
            opacity: fadeAnim, // Bind opacity to animated value
          }}
        />
      )
    } else {
      modalContents = ''
    }
    return <View>{modalContents}</View>
  }
}
