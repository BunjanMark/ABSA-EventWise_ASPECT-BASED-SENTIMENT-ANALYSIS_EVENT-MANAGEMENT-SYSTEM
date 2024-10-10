import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, ScrollView, View, Button } from "react-native";
import styles from "../../styles/styles";
import useStore from "../../../../stateManagement/useStore";
import EventPackageCard from "./EventPackageCard";
import AddEventOrPackageModal from "./AddEventOrPackageModal"; // Import the new modal component

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
      <AddEventOrPackageModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        type="package" // Set type to "package"
      />
    </SafeAreaView>
  );
};

export default EventPackages;
