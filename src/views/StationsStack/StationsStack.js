import { createStackNavigator } from 'react-navigation'
import Stations from '../Stations/Stations'
import Station from '../Station/Station'

export default createStackNavigator(
  {
    Stations: { screen: Stations },
    Station: { screen: Station },
  },
  {
    initialRouteName: 'Stations',
    headerMode: 'none',
  },
)
