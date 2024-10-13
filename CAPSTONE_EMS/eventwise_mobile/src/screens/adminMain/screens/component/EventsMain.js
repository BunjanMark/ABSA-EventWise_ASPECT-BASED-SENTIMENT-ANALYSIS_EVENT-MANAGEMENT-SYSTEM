import React, { useEffect } from "react";
import { SafeAreaView, Text, ScrollView, View } from "react-native";
import styles from "../../styles/styles";
import useStore from "../../../../stateManagement/useStore";
import EventMainCard from "./EventMainCard";
import event2 from "../../../../../assets/event2.png"; // Ensure you have the right path for the image

const EventsMain = () => {
  const { eventData, likedEvents, toggleLike, initializeLikedEvents } =
    useStore();

  useEffect(() => {
    initializeLikedEvents(); // Load liked events from storage
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "red" }]}>
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
        {eventData.map((event) => (
          <EventMainCard
            key={event.eventId} // Assuming each event has a unique eventId
            event={{
              id: event.eventId, // Use eventId from your data
              image: event.image || event2, // Default to event2 if no image in data
              title: event.eventName, // Using the eventName from your data
              date: event.eventDate, // Using the eventDate from your data
              location: event.eventLocation, // Using the eventLocation from your data
            }}
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
