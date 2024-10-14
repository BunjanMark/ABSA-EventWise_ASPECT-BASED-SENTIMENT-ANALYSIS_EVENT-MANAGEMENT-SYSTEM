import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Main Stack Home
import HomeAdmin from "../screens/home/HomeAdmin";
import MessagesAdmin from "../screens/home/MessagesAdmin";
import NotificationAdmin from "../screens/home/NotificationAdmin";
import ScheduleAdmin from "../screens/schedule/ScheduleAdmin";
import FeedbackAdmin from "../screens/feedback/FeedbackAdmin";
import Notifications from "../screens/notification/Notifications";

import AboutAdmin from "../screens/about/AboutAdmin";
// Schedule Stack imports

// event stack imports
import EventAdmin from "../screens/event/EventAdmin";
import ProfileAdmin from "../screens/profile/ProfileAdmin";
import AttendeeAdmin from "../screens/attendee/AttendeeAdmin";
import InventoryAdmin from "../screens/inventory/InventoryAdmin";
import EventFeedbackDetails from "../screens/feedback/EventFeedbackDetails";
import EditProfileAdmin from "../screens/profile/EditProfileAdmin";
import AddAccountScreenAdmin from "../screens/profile/AddAccountScreenAdmin";
import SettingsAdmin from "../screens/settings/SettingsAdmin";
import GroupAdmin from "../screens/group/GroupAdmin";

import GuestListAdmin from "../screens/group/GuestListAdmin";
import EventDetails from "../screens/event/EventDetails";
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

      <Stack.Screen name="MessagesAdmin" component={MessagesAdmin} />
      <Stack.Screen name="NotificationAdmin" component={Notifications} />
    </Stack.Navigator>
  );
};
const AboutAdminStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AboutAdminIndex" component={AboutAdmin} />
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
      <Stack.Screen name="EditProfileAdmin" component={EditProfileAdmin} />
      <Stack.Screen
        name="AddAccountScreenAdmin"
        component={AddAccountScreenAdmin}
      />
      <Stack.Screen name="EventDetails" component={EventDetails} />
    </Stack.Navigator>
  );
};

const EventStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventAdmin" component={EventAdmin} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
    </Stack.Navigator>
  );
};

const GroupStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GroupAdminIndex" component={GroupAdmin} />
      <Stack.Screen name="GuestListAdmin" component={GuestListAdmin} />
    </Stack.Navigator>
  );
};

const FeedbackStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FeedbackAdmin" component={FeedbackAdmin} />
      {/* <Stack.Screen
        name="FeedbackEventDetails"
        component={EventFeedbackDetails}
      /> */}
    </Stack.Navigator>
  );
};
const SettingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="OptionsSP" component={OptionsSP} /> */}
      {/* <Stack.Screen name="SettingsSP" component={SettingsSP} /> */}
      <Stack.Screen name="SettingsAdmin" component={SettingsAdmin} />
    </Stack.Navigator>
  );
};

const AttendeeTrackerStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AttendeeTrackerAdmin" component={AttendeeAdmin} />
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
  AboutAdminStackNavigator,
  InventoryTrackerStackNavigator,
};
