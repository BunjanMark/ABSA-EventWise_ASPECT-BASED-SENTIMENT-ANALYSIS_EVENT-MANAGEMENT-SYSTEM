import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Main Stack Home
import HomeAdmin from "../screens/home/HomeAdmin";
import AboutAdmin from "../screens/home/AboutAdmin";
import MessagesAdmin from "../screens/home/MessagesAdmin";
import NotificationAdmin from "../screens/home/NotificationAdmin";
import ScheduleAdmin from "../screens/schedule/ScheduleAdmin";
import FeedbackAdmin from "../screens/feedback/FeedbackAdmin";

// Schedule Stack imports

// event stack imports
import EventAdmin from "../screens/event/EventAdmin";
import ProfileAdmin from "../screens/profile/ProfileAdmin";
import AttendeeAdmin from "../screens/attendee/AttendeeAdmin";
import InventoryAdmin from "../screens/inventory/InventoryAdmin";
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
      <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
      <Stack.Screen name="AboutAdmin" component={AboutAdmin} />
      <Stack.Screen name="MessagesAdmin" component={MessagesAdmin} />
      <Stack.Screen name="NotificationAdmin" component={NotificationAdmin} />
    </Stack.Navigator>
  );
};

const ScheduleStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScheduleAdmin" component={ScheduleAdmin} />
    </Stack.Navigator>
  );
};

// For drawer stack
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileAdmin" component={ProfileAdmin} />
      {/* <Stack.Screen name="ProfileEditSP" component={ProfileEditSP} />
      <Stack.Screen name="OptionsSP" component={OptionsSP} />
      <Stack.Screen name="ProfileSwitchSP" component={ProfileSwitchSP} /> */}
    </Stack.Navigator>
  );
};

const EventStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventAdmin" component={EventAdmin} />
    </Stack.Navigator>
  );
};

const GroupStackNavigator = () => {
  return () => {
    return <Text>Group</Text>;
  };
};
const FeedbackStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FeedbackAdmin" component={FeedbackAdmin} />
    </Stack.Navigator>
  );
};
const SettingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="OptionsSP" component={OptionsSP} /> */}
      {/* <Stack.Screen name="SettingsSP" component={SettingsSP} /> */}
    </Stack.Navigator>
  );
};

const AttendeeTrackerStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AtendeeTrackerAdmin" component={AttendeeAdmin} />
    </Stack.Navigator>
  );
};
const InventoryTrackerStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InventoryTrackerAdmin" component={InventoryAdmin} />
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  ScheduleStackNavigator,
  EventStackNavigator,
  ProfileStackNavigator,
  SettingStackNavigator,
  GroupStackNavigator,
  FeedbackStackNavigator,
  AttendeeTrackerStackNavigator,
  InventoryTrackerStackNavigator,
};
