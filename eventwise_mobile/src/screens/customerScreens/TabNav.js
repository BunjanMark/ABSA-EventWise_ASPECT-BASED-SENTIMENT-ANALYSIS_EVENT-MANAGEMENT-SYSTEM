import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../";
import Event from "../screens/Event";
import Guest from "../screens/Guest";
import Book from "../screens/Book";

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Book") {
            iconName = "folder-multiple-plus";
          } else if (route.name === "Event") {
            iconName = "folder-multiple";
          } else if (route.name === "Guest") {
            iconName = "account-group";
          }

          return (
            <View style={{ width: "100%", alignItems: "center" }}>
              {focused && (
                <View
                  style={{
                    marginTop: 5,
                    height: 3,
                    width: "50%",
                    backgroundColor: "black",
                    borderRadius: 30,
                  }}
                />
              )}
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
                style={{ paddingTop: 5 }}
              />
            </View>
          );
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "#9F7E1C",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          bottom: 0,
          padding: 10,
          height: 60,
          zIndex: 8,
        },
        headerShown: false,
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              color,
              fontSize: focused ? 18 : 16,
              fontWeight: "bold",
              fontFamily: "jsMath-cmbx10s",
            }}
          >
            {route.name}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Book" component={Book} />
      <Tab.Screen name="Event" component={Event} />
      <Tab.Screen name="Guest" component={Guest} />
    </Tab.Navigator>
  );
};

export default TabNav;
