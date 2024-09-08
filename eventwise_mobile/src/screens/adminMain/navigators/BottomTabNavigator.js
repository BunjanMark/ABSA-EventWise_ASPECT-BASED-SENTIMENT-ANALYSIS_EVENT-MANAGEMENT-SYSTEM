import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  MainStackNavigator,
  ScheduleStackNavigator,
  EventStackNavigator,
  GroupStackNavigator,
  FeedbackStackNavigator,
} from "../navigators/StackNavigator";

const Tab = createBottomTabNavigator();
const screenOptions1 = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: Platform.OS === "ios" ? 90 : 70,
    backgroundColor: "#ffffff",
  },
  conse: ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "Home") {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === "Events") {
        iconName = focused ? "list" : "list-outline";
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "golden",
    tabBarInactiveTintColor: "gray",
  }),
};
const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarShowLabel: true,
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

  // to be put focused then lift
  tabBarLabelStyle: {
    fontSize: 14, // Font size for the label
    bottom: 21, // This elevates the label upwards
  },
  tabBarActiveTintColor: "golden",
  tabBarInactiveTintColor: "gray",
  tabBarIcon: ({ focused, color, size }) => {
    const iconstyle = {
      position: "absolute",
      backgroundColor: focused ? "golden" : "white",
      // height: "100%",
      top: 14,
    };
    const colorIcon = focused ? "#95720A" : "black";
    const sizeIcon = focused ? 34 : 30;
    let iconName;

    if (route.name === "Home") {
      iconName = focused ? "home" : "home-outline";
      return (
        <Ionicons
          name={iconName}
          size={sizeIcon}
          color={colorIcon}
          style={{
            ...iconstyle,
          }}
        />
      );
    } else if (route.name === "Schedule") {
      iconName = focused ? "calendar" : "calendar-outline";
      return (
        <Ionicons
          name={iconName}
          size={sizeIcon}
          color={colorIcon}
          style={{
            ...iconstyle,
          }}
        />
      );
    } else if (route.name === "Event") {
      // Use MaterialCommunityIcons for this case
      iconName = focused ? "clipboard-list" : "clipboard-list-outline";
      return (
        <MaterialCommunityIcons
          name={iconName}
          size={sizeIcon}
          color={colorIcon}
          style={{
            ...iconstyle,
          }}
        />
      );
    } else if (route.name === "Feedback") {
      iconName = focused
        ? "account-box-multiple"
        : "account-box-multiple-outline";
      return (
        <MaterialCommunityIcons
          name={iconName}
          size={sizeIcon}
          color={colorIcon}
          style={{
            ...iconstyle,
          }}
        />
      );
    }
  },
});
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Schedule" component={ScheduleStackNavigator} />
      <Tab.Screen name="Event" component={EventStackNavigator} />
      <Tab.Screen name="Feedback" component={FeedbackStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
