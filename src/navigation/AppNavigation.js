import { createStackNavigator } from 'react-navigation'
import { MainDrawer } from '../views'

import styles from './styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    MainDrawer: { screen: MainDrawer },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'MainDrawer',
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
)

export default PrimaryNav
