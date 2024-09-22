import React, { useEffect } from "react";
import { SafeAreaView, Text, ScrollView, View } from "react-native";
import styles from "../../styles/styles";
import useStore from "../../../../stateManagement/useStore";
import EventMainCard from "./EventMainCard";
import event2 from "../../../../../assets/event2.png";

const events = [
  {
    id: 1,
    image: event2,
    title: "Mr. & Mrs. Malik Wedding",
    date: "June 12, 2024",
    location: "Manila",
  },
  {
    id: 2,
    image: event2,
    title: "BIRTHDAY NAKO!!!",
    date: "July 20, 2024",
    location: "Quezon City",
  },
  {
    id: 3,
    image: event2,
    title: "TOUCH ME PLEASEEE",
    date: "August 15, 2024",
    location: "Cebu",
  },
];

const EventsMain = () => {
  const { likedEvents, toggleLike, initializeLikedEvents } = useStore();

  useEffect(() => {
    initializeLikedEvents(); // Load liked events from storage
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>
          <Text style={styles.title}>My Events</Text>
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollViewEventPackage}
      >
        {events.map((event) => (
          <EventMainCard
            key={event.id}
            event={event}
            likedEvents={likedEvents}
            toggleLike={toggleLike}
          />
        ))}
      </ScrollView>
      {/* <View style={styles.footer} /> */}
    </SafeAreaView>
  );
};

export default EventsMain;
