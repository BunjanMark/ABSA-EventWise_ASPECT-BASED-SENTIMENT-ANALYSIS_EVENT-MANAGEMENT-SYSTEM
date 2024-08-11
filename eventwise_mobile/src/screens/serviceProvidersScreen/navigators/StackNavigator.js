import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Main Stack Home
import HomeSP from "../screens/HomeSP";

// Schedule Stack imports
import Schedule from "../screens/ScheduleSP";

import ProfileSP from "../screens/Drawer/ProfileSP";
import ProfileEditSP from "../screens/Drawer/ProfileEditSP";
import AboutMeSP from "../screens/AboutMeSP";
import ScheduleSP from "../screens/ScheduleSP";
import SettingsSP from "../screens/Drawer/SettingsSP";
import ProfileSwitchSP from "../screens/Drawer/ProfileSwitchSP";
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};
const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeSP" component={HomeSP} />

      <Stack.Screen name="AboutMeSP" component={AboutMeSP} />
    </Stack.Navigator>
  );
};

const ScheduleStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScheduleSP" component={ScheduleSP} />
    </Stack.Navigator>
  );
};

// For drawer stack
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileSP" component={ProfileSP} />
      <Stack.Screen name="ProfileEditSP" component={ProfileEditSP} />
      {/* <Stack.Screen name="SettingsSP" component={SettingsSP} /> */}
      <Stack.Screen name="ProfileSwitchSP" component={ProfileSwitchSP} />
    </Stack.Navigator>
  );
};
export { MainStackNavigator, ScheduleStackNavigator, ProfileStackNavigator };
