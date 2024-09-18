import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import EventPackages from "../component/EventPackages";
import EventCalendar from "../component/EventCalendar";
import { ScrollView } from "react-native-gesture-handler";

const HomeAdmin = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <EventCalendar />
        {/* <Text>All events</Text> */}
        <EventPackages />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeAdmin;
