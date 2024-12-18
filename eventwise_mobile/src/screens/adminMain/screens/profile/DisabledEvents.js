import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useEventStore } from "../../../../stateManagement/admin/useEventStore";

const DisabledEvents = () => {
  const { currentEvents } = useEventStore();

  // Filter for disabled events
  const disabledEvents = currentEvents.filter(
    (event) => event.status === "disabled"
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disabled Events</Text>

      {disabledEvents.length > 0 ? (
        <FlatList
          data={disabledEvents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <Text style={styles.eventName}>{item.name}</Text>
              <Text style={styles.eventDetails}>Date: {item.date}</Text>
              <Text style={styles.eventDetails}>Location: {item.location}</Text>
              <Text style={styles.eventDetails}>
                Description: {item.description}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noEventsText}>No disabled events available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  eventCard: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventDetails: {
    fontSize: 14,
    color: "#666",
  },
  noEventsText: {
    fontSize: 16,
    textAlign: "center",
    color: "#999",
  },
});

export default DisabledEvents;
