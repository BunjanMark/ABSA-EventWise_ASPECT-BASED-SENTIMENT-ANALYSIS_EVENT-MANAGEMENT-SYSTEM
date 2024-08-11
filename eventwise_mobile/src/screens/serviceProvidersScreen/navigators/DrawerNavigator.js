import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ProfileStackNavigator } from "./StackNavigator";
import CustomDrawerContent from "./CustomDrawerContent";
import BottomTabNavigator from "./BottomTabNavgator";
import { TouchableOpacity } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
// import stack screen

const AppDrawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <AppDrawer.Navigator
      initialRouteName="HomeSP"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <AppDrawer.Screen
        name="HomeSP"
        component={BottomTabNavigator}
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      <AppDrawer.Screen name="Profile" component={ProfileStackNavigator} />
    </AppDrawer.Navigator>
  );
};

export default DrawerNavigator;
