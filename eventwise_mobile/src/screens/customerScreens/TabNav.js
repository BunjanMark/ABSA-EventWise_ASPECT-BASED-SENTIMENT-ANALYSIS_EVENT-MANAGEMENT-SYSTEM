import React, { useState } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./screens/Home";
import Event from "./screens/Event";
import Schedule from "./sidebarScreens/Schedule";
import BookStackScreen from "./BookStackScreen"; 

const Tab = createBottomTabNavigator();

const TabNav = () => {
  const [hoveredTab, setHoveredTab] = useState(null);

  const getIconName = (routeName) => {
    switch (routeName) {
      case "Home":
        return "home-outline";  
      case "Schedule":
        return "calendar-clock-outline";
      case "Event":
        return "calendar-text-outline";
      case "Book":
        return "bookmark-box-multiple";
      default:
        return "help";
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getIconName(route.name);
          const isHovered = hoveredTab === route.name;
          const tabColor = focused || isHovered ? "#eeba2b" : color;

          return (
            <View
              style={{ width: "100%", alignItems: "center" }}
              onMouseEnter={() => setHoveredTab(route.name)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              {focused && (
                <View
                  style={{
                    marginTop: 5,
                    height: 3,
                    width: "50%",
                    backgroundColor: "#eeba2b",
                    borderRadius: 30,
                  }}
                />
              )}
              {route.name === "Home" ? (
                <Ionicons
                  name={iconName}
                  size={size}
                  color={tabColor}
                  style={{ paddingTop: 5 }}
                />
              ) : (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={tabColor}
                  style={{ paddingTop: 5 }}
                />
              )}
            </View>
          );
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 0,
          padding: 5,
          height: 70,
          zIndex: 8,
        },
        headerShown: false,
        tabBarLabel: ({ focused, color }) => {
          const isHovered = hoveredTab === route.name;
          const labelColor = focused || isHovered ? "#eeba2b" : color;

          return (
            <Text
              style={{
                color: labelColor,
                fontSize: focused ? 16 : 16,
                fontWeight: "bold",
                fontFamily: "Poppins",
                marginBottom: 5,
              }}
              onMouseEnter={() => setHoveredTab(route.name)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              {route.name}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Event" component={Event} />
      <Tab.Screen name="Book" component={BookStackScreen} /> 
    </Tab.Navigator>
  );
};

export default TabNav;
