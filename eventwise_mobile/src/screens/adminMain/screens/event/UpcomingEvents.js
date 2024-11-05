import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import useStore from "../../../../stateManagement/useStore"; // Adjust the path as needed

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const { eventData } = useStore(); // Assuming eventData contains the events

  useEffect(() => {
    // Fetch upcoming events, assuming eventData is an array of events
    const fetchUpcomingEvents = () => {
      const today = new Date();
      const filteredEvents = eventData.filter((event) => {
        const eventDate = new Date(event.eventDate);
        return eventDate >= today; // Only include events today or in the future
      });
      setUpcomingEvents(filteredEvents);
    };

    fetchUpcomingEvents();
  }, [eventData]);

  const renderEventItem = ({ item }) => (
    <View style={styles.eventContainer}>
      <Image source={{ uri: item.EventImage }} style={styles.eventImage} />
      <Text style={styles.eventName}>{item.eventName}</Text>
      <Text style={styles.eventDescription}>{item.eventDescription}</Text>
      <Text
        style={styles.eventDate}
      >{`${item.eventDate} at ${item.eventTime}`}</Text>
      <Text style={styles.eventLocation}>{item.eventLocation}</Text>
      <Text
        style={styles.eventPackage}
      >{`Package: ${item.eventPackageName}`}</Text>
      <Text
        style={styles.totalPrice}
      >{`Total Price: ₱${item.totalPrice}`}</Text>
    </View>
  );

  return (
    <View>
      <Text style={styles.header}>Upcoming Events</Text>
      <FlatList
        data={upcomingEvents}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.eventId}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  eventImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  eventDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  eventDate: {
    fontSize: 12,
    color: "gray",
  },
  eventLocation: {
    fontSize: 12,
    color: "gray",
  },
  eventPackage: {
    fontSize: 12,
    marginTop: 5,
    fontStyle: "italic",
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
});

export default UpcomingEvents;
