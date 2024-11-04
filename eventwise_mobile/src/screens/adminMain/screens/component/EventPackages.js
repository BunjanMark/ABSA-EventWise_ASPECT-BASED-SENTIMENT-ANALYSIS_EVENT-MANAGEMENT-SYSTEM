import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Button,
  Modal,
} from "react-native";
import styles from "../../styles/styles";
import useStore from "../../../../stateManagement/useStore";
import EventPackageCard from "./EventPackageCard";
import AddEventOrPackageModalNew from "./AddEventOrPackageModalNew";
import AddEventOrPackageModal from "./AddEventOrPackage/AddEventOrPackageModal";
import AddPackageG from "./AddPackageGcp";
import TestUploadComponent from "./testUploadComponent";
const EventPackages = () => {
  const { likedEvents, toggleLike, initializeLikedEvents, eventPackages } =
    useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    initializeLikedEvents(); // Load liked events from storage
  }, []);

  return (
    <SafeAreaView style={[styles.container, {}]}>
      <View>
        <Text style={styles.header}>
          <Text style={styles.title}>My Event Packages</Text>
        </Text>
        <Button
          title="Add Event Package"
          onPress={() => setIsModalVisible(true)}
        />
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollViewEventPackage}
      >
        {eventPackages.map((packageItem) => (
          <EventPackageCard
            key={packageItem.packageId}
            event={{
              id: packageItem.packageId,
              image: require("../../../../../assets/event2.png"),
              title: packageItem.packageName,
              date: "", // Add date if applicable
              location: "", // Add location if applicable
              price: packageItem.packagePrice,
              description: packageItem.packageDescription,
            }}
            likedEvents={likedEvents}
            toggleLike={toggleLike}
          />
        ))}
      </ScrollView>

      {/* Modal for adding new event/package */}
      {/* <AddEventOrPackageModalNew
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        type="package" // Set type to "package"
      /> */}

      <AddPackageG onClose={() => setIsModalVisible(false)} />
      <TestUploadComponent />
    </SafeAreaView>
  );
};

export default EventPackages;
