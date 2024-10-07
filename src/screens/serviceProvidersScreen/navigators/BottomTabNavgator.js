import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  MainStackNavigator,
  ScheduleStackNavigator,
  EventStackNavigator,
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
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Home") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name === "Schedule") {
      iconName = focused ? "calendar" : "calendar-outline";
    } else if (route.name === "Events") {
      iconName = focused ? "list" : "list-outline";
    } else if (route.name === "Others") {
      iconName = focused
        ? "ellipsis-horizontal"
        : "ellipsis-horizontal-outline";
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: "golden",
  tabBarInactiveTintColor: "gray",
});
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Schedule" component={ScheduleStackNavigator} />
      <Tab.Screen name="Events" component={EventStackNavigator} />
      <Tab.Screen name="Others" component={ScheduleStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
