import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Alert, BackHandler } from "react-native";
import Home from "./screens/Home";
import Event from "./screens/Event";
import Guest from "./screens/Guest";
import Book from "./screens/Book";

const Tab = createBottomTabNavigator();
const TabNav = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    Alert.alert("Exit App", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "OK", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    const onFocus = () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    };

    const onBlur = () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };

    navigation.addListener("focus", onFocus);
    navigation.addListener("blur", onBlur);

    return () => {
      navigation.removeListener("focus", onFocus);
      navigation.removeListener("blur", onBlur);
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [navigation]);
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
          padding: 5,
          height: 60,
          zIndex: 8,
        },
        headerShown: false,
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{ color, fontSize: focused ? 18 : 16, fontWeight: "bold" }}
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
