import { StyleSheet } from "react-native";
import { Platform } from "react-native";
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
  //   admin drawer content
  drawerContent: {
    flex: 1,
  },
  sidebarFooter: {
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

  // Event Packages
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
  // tabBar Style tab bar tab
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: Platform.OS === "ios" ? 80 : 90,
    backgroundColor: "#ffffff",
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

  // Home container style (calendar)
  container: {
    flex: 1,
    paddingVertical: 14,
    padding: 12,
    // backgroundColor: "green",

    // margin: 5,
    borderRadius: 8,
    paddingTop: 10,
    height: "100%",
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // backgroundColor: "red",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
    // marginBottom: 12,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "300",
    color: "rgba(53,53,53,0.9)",
    // marginBottom: 12,
    paddingTop: 11,
  },
  calendar: {
    height: 70,

    // apply glass effect
    backgroundColor: "rgba(255,252,221,99)", //yellow ni sya sa calendar strip

    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: -3,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },

  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginTop: 0,
    padding: 0,
    backgroundColor: "transparent",
  },
  placeholderInset: {
    // borderWidth: 3,
    // borderColor: "#e5e7eb",
    // borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 4,
    // padding: 0,
  },
  scheduleItem: {
    marginBottom: 13,
    padding: 10,
    // backgroundColor: "#f9f9f9",
    backgroundColor: "rgba(249,250,237,1)",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scheduleTitleContainer: {
    // marginBottom: 7,
    width: "100%",
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  scheduleDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  toggleButtonText: {
    color: "black",
    textAlign: "center",
    left: Platform.OS === "ios" ? 10 : 110,
  },
  // Dropdown Calendar scrollview
  calendarScrollView: {
    display: "flex",
    position: "absolute",
    bottom: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "red",

    flexDirection: "column",
    left: 12,
  },
  dropdownCalendar: {
    display: "flex",
    // position: "absolute",
    top: 100,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // height: "600",
    width: "100%",
    backgroundColor: "red",
    zIndex: 1,
  },

  scheduleTime: {
    fontSize: 14,
    fontWeight: "500",
    color: "#007aff",
  },
  scheduleDescription: {
    fontSize: 14,
    color: "#666",
  },

  //   flexDirection: "row",
  //   marginBottom: 16,
  // },
  // scheduleTime: {
  //   fontSize: 16,
  //   fontWeight: "600",
  //   color: "#007aff",
  //   marginRight: 12,
  // },
  // scheduleDetails: {
  //   flex: 1,
  // },
  // scheduleTitle: {
  //   fontSize: 16,
  //   fontWeight: "700",
  //   color: "#333",
  // },
  // scheduleDescription: {
  //   fontSize: 14,
  //   color: "#666",
  // },
  // noScheduleText: {
  //   fontSize: 16,
  //   color: "#999",
  //   textAlign: "center",
  //   marginTop: 20,
  // },
  footerSchedule: {
    marginTop: "auto",
    paddingHorizontal: 16,
  },
  btnSchedule: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnTextSchedule: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
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

  // Event Packages, package EventPackages.js
  scrollViewEventPackage: {
    flexDirection: "row",
  },
  eventCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flex: 1,
  },
  heartIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "white",
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Optional: semi-transparent background
  },
  modalView: {
    width: "80%",
    height: "60%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default styles;
