import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  MainStackNavigator,
  ScheduleStackNavigator,
} from "../navigators/StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Schedule" component={ScheduleStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
