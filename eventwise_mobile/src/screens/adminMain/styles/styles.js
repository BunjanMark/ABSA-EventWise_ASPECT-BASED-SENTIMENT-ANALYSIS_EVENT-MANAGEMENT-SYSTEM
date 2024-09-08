import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // SIDEBAR
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    elevation: 4,
  },
  navItems: {
    flexDirection: "row",
  },
  navItem: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "black",
  },

  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },

  drawerSeparator: {
    height: 1,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: -45,
    marginBottom: 20,
  },

  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  drawerItemText: {
    color: "white",
    fontSize: 16,
    marginLeft: 20,
  },
  logo: {
    flex: 1,
    height: "100%",
    resizeMode: "contain",
    marginLeft: "auto",
    marginRight: "auto",
    width: 100,
  },

  // NAV BAR STYLE

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#95720A",
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  selectedContainer: {
    backgroundColor: "#95720A",
  },
  iconText: {
    marginTop: 4,
    fontSize: 12,
  },

  // header style
  // For header
  headerContainer: {
    height: 100,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    elevation: 4,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    marginLeft: 20,
  },
  // my event

  menuButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  topSection: {
    alignItems: "center",
    paddingTop: 50,
  },
  addButton: {
    marginBottom: 20,
  },
  buttonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  eventInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  eventTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
  },
  detailText: {
    color: "black",
    fontSize: 14,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  editButton: {
    marginTop: 30,
    paddingHorizontal: 15,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  userInfo: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfoTop: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userName: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  userRole: {
    color: "black",
    fontSize: 14,
    marginTop: 5,
  },
  footer: {
    padding: 20,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "black",
  },
  flexibleSpace: {
    flex: 0.8,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 12,
    top: 120,
    left: 118,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    color: "black",
  },
  dropdownIcon: {
    marginRight: 10,
    color: "black",
  },
  dropdownItemText: {
    color: "black",
    fontSize: 16,
  },

  //   admin drawer content
  drawerContent: {
    flex: 1,
  },
  footer: {
    padding: 20,
    // borderTopWidth: 1,
    // borderTopColor: "red",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginVertical: 5,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
    marginVertical: 10,
  },
  drawerHeader: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",

    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
});

export default styles;
