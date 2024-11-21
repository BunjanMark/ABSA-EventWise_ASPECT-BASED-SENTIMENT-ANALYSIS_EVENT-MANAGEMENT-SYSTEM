import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Loader from "./Loader";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
const Stack = createStackNavigator();
import { useEffect } from "react";
import {
  registerForPushNotificationsAsync,
  sendTokenToBackend,
} from "./PushNotification";
function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Loader" component={Loader} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
