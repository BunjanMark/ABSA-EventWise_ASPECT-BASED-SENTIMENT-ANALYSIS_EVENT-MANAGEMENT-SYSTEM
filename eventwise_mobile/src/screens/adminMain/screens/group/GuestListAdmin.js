// screens/GuestList.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
// import styles from "../../styles/styles";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import useStore from "../../../../stateManagement/useStore";
import { DataTable } from "react-native-paper";

const GuestListAdmin = () => {
  const route = useRoute();
  const { eventData } = useStore();
  const { eventId, totalGuests } = route.params;

  const eventGuestData = eventData.find((event) => event.eventId === eventId);
  const { guestData } = eventGuestData;

  const [showFullDetails, setShowFullDetails] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const handleLongPress = (guest) => {
    setSelectedGuest(guest);
    setShowFullDetails(true);
  };

  const handleHoverIn = (guest) => {
    setSelectedGuest(guest);
    setShowFullDetails(true);
  };

  const handleHoverOut = () => {
    setShowFullDetails(false);
  };
  // count length of guest data
  console.log(typeof guestData);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guest List</Text>
      <Text>Total guest: {totalGuests}</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Phone</DataTable.Title>
          <DataTable.Title>Role</DataTable.Title>
        </DataTable.Header>
        {guestData?.map((guest, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell
              onPressIn={() => handleHoverIn(guest)}
              onPressOut={handleHoverOut}
            >
              {showFullDetails && selectedGuest.name === guest.name ? (
                <View>
                  <Text style={styles.fullDetailsText}>Name: {guest.name}</Text>
                  <Text style={styles.fullDetailsText}>
                    Email: {guest.email}
                  </Text>
                  <Text style={styles.fullDetailsText}>
                    Phone: {guest.phone}
                  </Text>
                  <Text style={styles.fullDetailsText}>Role: {guest.role}</Text>
                </View>
              ) : (
                guest.name
              )}
            </DataTable.Cell>

            <DataTable.Cell
              onPressIn={() => handleHoverIn(guest)}
              onPressOut={handleHoverOut}
            >
              {showFullDetails && selectedGuest.email === guest.email ? (
                <View>
                  <Text style={styles.fullDetailsText}>Name: {guest.name}</Text>
                  <Text style={styles.fullDetailsText}>
                    Email: {guest.email}
                  </Text>
                  <Text style={styles.fullDetailsText}>
                    Phone: {guest.phone}
                  </Text>
                  <Text style={styles.fullDetailsText}>Role: {guest.role}</Text>
                </View>
              ) : (
                guest.email
              )}
            </DataTable.Cell>

            <DataTable.Cell
              onPressIn={() => handleHoverIn(guest)}
              onPressOut={handleHoverOut}
            >
              {showFullDetails && selectedGuest.phone === guest.phone ? (
                <View>
                  <Text style={styles.fullDetailsText}>Name: {guest.name}</Text>
                  <Text style={styles.fullDetailsText}>
                    Email: {guest.email}
                  </Text>
                  <Text style={styles.fullDetailsText}>
                    Phone: {guest.phone}
                  </Text>
                  <Text style={styles.fullDetailsText}>Role: {guest.role}</Text>
                </View>
              ) : (
                guest.phone
              )}
            </DataTable.Cell>

            <DataTable.Cell
              onPressIn={() => handleHoverIn(guest)}
              onPressOut={handleHoverOut}
            >
              {showFullDetails && selectedGuest.role === guest.role ? (
                <View>
                  <Text style={styles.fullDetailsText}>Name: {guest.name}</Text>
                  <Text style={styles.fullDetailsText}>
                    Email: {guest.email}
                  </Text>
                  <Text style={styles.fullDetailsText}>
                    Phone: {guest.phone}
                  </Text>
                  <Text style={styles.fullDetailsText}>Role: {guest.role}</Text>
                </View>
              ) : (
                guest.role
              )}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      {showFullDetails && (
        <View style={styles.fullDetailsContainer}>
          <Text style={styles.fullDetailsTitle}>Full Details</Text>
          <Text style={styles.fullDetailsText}>Name: {selectedGuest.name}</Text>
          <Text style={styles.fullDetailsText}>
            Email: {selectedGuest.email}
          </Text>
          <Text style={styles.fullDetailsText}>
            Phone: {selectedGuest.phone}
          </Text>
          <Text style={styles.fullDetailsText}>Role: {selectedGuest.role}</Text>
          {/* <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowFullDetails(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dataTable: {
    marginBottom: 20,
  },
  dataTableHeader: {
    backgroundColor: "#f7f7f7",
  },
  dataTableTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dataTableRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  dataTableCell: {
    fontSize: 14,
    padding: 10,
  },
  fullDetailsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    padding: 20,
  },
  fullDetailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fullDetailsText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});
export default GuestListAdmin;
