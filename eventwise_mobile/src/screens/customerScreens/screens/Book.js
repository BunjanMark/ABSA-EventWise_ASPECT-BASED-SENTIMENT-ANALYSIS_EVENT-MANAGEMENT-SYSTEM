import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BookingProcess from "../event/BookingProcess";
import PackagesList from "../event/PackagesList";
import EventPackagesHome from "../../adminMain/screens/event/EventPackagesHome";
import { ScrollView } from "react-native-gesture-handler";
import EventPackages from "../../adminMain/screens/component/EventPackages";
import { useState } from "react";
const Book = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView>
        {/* <EventPackagesHome /> */}
        {/* <EventPackages /> */}
        <PackagesList />
        <Button title="Add Event" onPress={() => setIsModalVisible(true)} />
        <BookingProcess
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          type="event" // Set type to "package"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Book;
