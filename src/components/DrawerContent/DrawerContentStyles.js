import { Colors, Fonts } from '../../themes'

export default {
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  drawerHeader: {
    backgroundColor: Colors.white,
    padding: 18,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  drawerItem: {
    ...Fonts.style.drawerItem,
    color: Colors.midGray,
    paddingTop: 25,
    paddingLeft: 18,
    paddingBottom: 5,
  },
  userMetaContainer: {},
  userLabel: {
    ...Fonts.style.detail,
    color: Colors.midGray,
    marginBottom: 3,
  },
  userName: {
    ...Fonts.style.detailBold,
    color: Colors.midGray,
  },
  userImageContainer: {
    width: 50,
    marginRight: 15,
  },
  userImage: {
    width: 50,
    height: 50,
  },
  drawerFooter: {
    height: 100,
    backgroundColor: Colors.white,
    marginTop: 50,
    padding: 18,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
}
