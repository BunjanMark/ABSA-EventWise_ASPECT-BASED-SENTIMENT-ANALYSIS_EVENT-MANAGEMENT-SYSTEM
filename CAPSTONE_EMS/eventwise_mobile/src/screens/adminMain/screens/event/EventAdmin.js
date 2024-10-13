import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import EventPackages from "../component/EventPackages";
import { ScrollView } from "react-native-gesture-handler";
import EventsMain from "../component/EventsMain";

const EventAdmin = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <ScrollView>
          <EventsMain />
        </ScrollView>
        <ScrollView>
          <EventPackages />
        </ScrollView>
        <View style={{ height: 100 }} />
        <View style={{ height: 100 }} />
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventAdmin;
