import { createStackNavigator } from 'react-navigation'
import Station from '../Station/Station'
import Dashboard from '../Dashboard/Dashboard'
import { Animated, Easing } from 'react-native'

let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1]
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  })

  const translateY = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  })

  return {
    opacity,
    transform: [
      {
        translateY,
      },
    ],
  }
}

let SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1]
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0],
  })
  const slideFromRight = { transform: [{ translateX }] }
  return slideFromRight
}

let SlideFromBottom = (index, position, height) => {
  const inputRange = [index - 1, index, index + 1]
  const translateY = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [height, 0, 0],
  })
  const slideFromRight = { transform: [{ translateY }] }
  return slideFromRight
}

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 400,
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps
      const width = layout.initWidth
      const height = layout.initHeight
      const { index, route } = scene
      const params = route.params || {} // <- That's new
      const transition = params.transition || 'default' // <- That's new
      return {
        collapseExpand: CollapseExpand(index, position),
        default: SlideFromRight(index, position, width),
        slideFromBottom: SlideFromBottom(index, position, height),
      }[transition]
    },
  }
}

export default createStackNavigator(
  {
    Dashboard: { screen: Dashboard },
    Station: { screen: Station },
  },
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
    transitionConfig: TransitionConfiguration,
  },
)
