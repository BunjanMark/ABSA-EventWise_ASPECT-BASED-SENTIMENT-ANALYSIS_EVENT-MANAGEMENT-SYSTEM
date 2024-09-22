import React, { useEffect } from "react";
import { SafeAreaView, Text, ScrollView, View } from "react-native";
import styles from "../../styles/styles";
import useStore from "../../../../stateManagement/useStore";
import EventPackageCard from "./EventPackageCard";
import event2 from "../../../../../assets/event2.png";

const eventPackage = [
  {
    id: 1,
    image: event2,
    title: "Wedding Package",
    date: "June 12, 2024",
    location: "Manila",
  },
  {
    id: 2,
    image: event2,
    title: "Birthday Package",
    date: "July 20, 2024",
    location: "Quezon City",
  },
  {
    id: 3,
    image: event2,
    title: "Reunion Package",
    date: "August 15, 2024",
    location: "Cebu",
  },
];

const EventPackages = () => {
  const { likedEvents, toggleLike, initializeLikedEvents } = useStore();

  useEffect(() => {
    initializeLikedEvents(); // Load liked events from storage
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>
          <Text style={styles.title}>My Event Packages</Text>
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollViewEventPackage}
      >
        {eventPackage.map((event) => (
          <EventPackageCard
            key={event.id}
            event={event}
            likedEvents={likedEvents}
            toggleLike={toggleLike}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventPackages;
