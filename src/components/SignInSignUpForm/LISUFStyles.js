import { Metrics, Colors, Fonts } from '../../themes'

export default {
  LISUF_buttonStyle: {
    marginTop: 35,
    width: 150,
  },
  LISUF_formLabel: {
    color: Colors.nearBlack,
  },
  LISUF_input: {
    color: Colors.nearBlack,
  },
  LISUF_containerStyle: {
    marginTop: 20,
    borderBottomWidth: 0,
    borderBottomColor: Colors.white,
  },
  LISUF_inputContainerStyle: {
    borderBottomColor: Colors.lightGray,
  },
  LISUF_tabContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginLeft: 25,
    alignItems: 'center',
    marginRight: 25,
    paddingBottom: 30,
    borderBottomLeftRadius: Metrics.buttonRadius,
    borderBottomRightRadius: Metrics.buttonRadius,
  },
  LISUF_tabBarOptions: {
    style: {
      marginLeft: 25,
      marginRight: 25,
      borderTopLeftRadius: Metrics.buttonRadius,
      borderTopRightRadius: Metrics.buttonRadius,
    },
    labelStyle: {
      fontSize: 18,
      paddingBottom: 10,
    },
    activeTintColor: Colors.blue,
    inactiveTintColor: Colors.lightBlue,
    indicatorStyle: {
      borderBottomColor: Colors.blue,
      borderBottomWidth: 2,
      backgroundColor: Colors.blue,
    },
  },
}
