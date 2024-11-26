import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { DataTable } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useGuestStore } from "../../../../stateManagement/admin/useGuestStore";
import { fetchGuestEventDetails } from "../../../../services/organizer/adminGuestServices";

const GuestListAdmin = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { eventId, name } = route.params;

  const { guests, setGuests } = useGuestStore();
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const refreshGuests = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      const updatedGuests = await fetchGuestEventDetails(eventId);
      setGuests(updatedGuests);
    } catch (err) {
      setError("Failed to fetch guest data. Please try again later.");
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }, [eventId, setGuests]);

  useEffect(() => {
    refreshGuests();
  }, [refreshGuests]);

  const handleRowPress = (guest) => {
    navigation.navigate("GuestDetail", { guest });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshGuests} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Guest List for Event</Text>
        <Text style={styles.eventName}>{name}</Text>
      </View>
      <Text style={styles.subTitle}>Total Guests: {guests.length}</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {guests.length === 0 && !error ? (
        <Text style={styles.emptyMessage}>No guests found for this event.</Text>
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.tableHeaderText}>
              Name
            </DataTable.Title>
            <DataTable.Title style={styles.tableHeaderText}>
              Email
            </DataTable.Title>
            <DataTable.Title style={styles.tableHeaderText}>
              Phone
            </DataTable.Title>
            <DataTable.Title style={styles.tableHeaderText}>
              Role
            </DataTable.Title>
          </DataTable.Header>

          {guests.map((guest, index) => (
            <DataTable.Row
              key={index}
              onPress={() => handleRowPress(guest)}
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
              ]}
            >
              <DataTable.Cell>{guest.GuestName}</DataTable.Cell>
              <DataTable.Cell>{guest.email}</DataTable.Cell>
              <DataTable.Cell>{guest.phone}</DataTable.Cell>
              <DataTable.Cell>{guest.role}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#0066cc",
    paddingVertical: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  eventName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#cce7ff",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#343a40",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  emptyMessage: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 20,
  },
  tableHeaderText: {
    fontWeight: "bold",
    color: "#343a40",
  },
  tableRow: {
    paddingVertical: 10,
  },
  tableRowEven: {
    backgroundColor: "#ffffff",
  },
  tableRowOdd: {
    backgroundColor: "#f1f3f5",
  },
});

export default GuestListAdmin;
