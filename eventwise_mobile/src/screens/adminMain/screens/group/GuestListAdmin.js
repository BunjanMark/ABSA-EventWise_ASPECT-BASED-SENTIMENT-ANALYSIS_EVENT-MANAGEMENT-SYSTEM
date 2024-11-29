import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from 'axios';
import API_URL from '../../../../constants/constant';
import { useGuestStore } from "../../../../stateManagement/admin/useGuestStore";
import { fetchGuestEventDetails } from "../../../../services/organizer/adminGuestServices";
import { sendEventNoticeToAllGuests } from "../../../../services/organizer/adminEventServices";
import { TextInput, Button, Menu, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the 3-dot icon
import Modal from 'react-native-modal'; // For showing modal



const GuestListAdmin = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { eventId, name, pax } = route.params;

  const { guests, setGuests } = useGuestStore();
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false); // For dropdown visibility
  const [guestForDropdown, setGuestForDropdown] = useState(null); // Track selected guest for the dropdown
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [updatedGuestName, setUpdatedGuestName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const [updatedRole, setUpdatedRole] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // For deletion confirmation modal




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

  const handleSendNotifications = async () => {
    try {
      await sendEventNoticeToAllGuests(eventId);
      console.log("Notifications sent.");
    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  };
  const handleEdit = (guest) => {
    setSelectedGuest(guest);
    setUpdatedGuestName(guest.GuestName);
    setUpdatedEmail(guest.email);
    setUpdatedPhone(guest.phone);
    setUpdatedRole(guest.role);
    setModalVisible(true);
    setVisible(false); // Close the dropdown when Edit is clicked
  };
  const handleUpdateGuest = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/api/guest/${selectedGuest.id}`,
        {
          GuestName: updatedGuestName,
          email: updatedEmail,
          phone: updatedPhone,
          role: updatedRole,
        }
      );

      if (response.status === 200) {
        setGuests((prevGuests) =>
          prevGuests.map((guest) =>
            guest.id === selectedGuest.id
              ? { ...guest, GuestName: updatedGuestName, email: updatedEmail, phone: updatedPhone, role: updatedRole }
              : guest
          )
        );
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Error updating guest:', error);
    }
  };

  const handleDelete = (guest) => {
    setSelectedGuest(guest);
    setDeleteModalVisible(true);
    setVisible(false); // Close the dropdown when Delete is clicked
  };
  const toggleDropdown = (guest) => {
    if (guestForDropdown?.id === guest.id) {
      setVisible(!visible); // Toggle dropdown if clicked on the same guest
    } else {
      setGuestForDropdown(guest); // Set selected guest and open dropdown
      setVisible(true);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshGuests} />
      }
    >
    <Modal
  isVisible={modalVisible}
  onBackdropPress={() => setModalVisible(false)}
  animationIn="fadeIn" // Fade-in animation when opening
  animationOut="fadeOut" // Fade-out animation when closing
  backdropOpacity={0.5} // Adjust opacity to make it semi-transparent
  backdropColor="rgba(0, 0, 0, 0.5)" // Semi-transparent black background
>
  <View style={styles.modalContent}>
  <TouchableOpacity
      onPress={() => setModalVisible(false)}
      style={styles.closeButton}
    >
      <Icon name="close" size={24} color="#333" />
    </TouchableOpacity>
    <Text style={styles.modalTitle}>Edit Guest Details</Text>
    <TextInput
      label="Guest Name"
      value={updatedGuestName}
      onChangeText={setUpdatedGuestName}
      style={styles.input}
    />
    <TextInput
      label="Email"
      value={updatedEmail}
      onChangeText={setUpdatedEmail}
      style={styles.input}
    />
    <TextInput
      label="Phone"
      value={updatedPhone}
      onChangeText={setUpdatedPhone}
      style={styles.input}
    />
    <TextInput
      label="Role"
      value={updatedRole}
      onChangeText={setUpdatedRole}
      style={styles.input}
    />
    <Button
      mode="contained"
      style={styles.updateButton}
      onPress={handleUpdateGuest}
    >
      Update Guest Details
    </Button>
  </View>
</Modal>
      <View style={styles.header}>
        <Text style={styles.title}>
          Guest List for Event <Text style={styles.eventName}>{name}</Text>
        </Text>
      </View>

      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>
          Total Guests listed: {guests.length} / {pax}
        </Text>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendNotifications}>
          <Text style={styles.sendButtonText}>Send Notif. </Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {guests.length === 0 && !error ? (
        <Text style={styles.emptyMessage}>No guests found for this event.</Text>
      ) : (
        guests.map((item, index) => (
          <View style={styles.listItem}>
                <Menu
                  visible={visible && guestForDropdown?.id === item.id}
                  onDismiss={() => setVisible(false)}
                  anchor={
                    <TouchableOpacity
                      onPress={() => toggleDropdown(item)}
                      style={styles.dotsContainer}
                    >
                      <Icon name="more-vert" size={24} color="#333" />
                    </TouchableOpacity>
                  }
                >
                  <View style={styles.menu}>
                    <Menu.Item onPress={() => handleEdit(item)} title="Edit" />
                    <Divider />
                    <Menu.Item onPress={() => handleDelete(item)} title="Delete" />
                  </View>
                </Menu>

                <View style={styles.guestContainer}>
                  <Text style={styles.guestName}>{item.GuestName}</Text>
                  <Text style={styles.guestInfo}>Email: {item.email}</Text>
                  <Text style={styles.guestInfo}>Phone: {item.phone}</Text>
                  <Text style={styles.guestInfo}>Role: {item.role}</Text>
                </View>
              </View>
          
        ))
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
    paddingVertical: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  eventName: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
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
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between", // Aligns guest details and dots button at opposite ends
    borderColor: "#eeba2b",
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 15,
    position: "relative",
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
  },
  guestContainer: {
    flex: 1, // Ensures the guest info takes up all the space on the left
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  guestName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#343a40",
  },
  guestInfo: {
    fontSize: 14,
    color: "#495057",
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  deleteModalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  updateButton: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#eeba2b',
  },
  dotsContainer: {
    padding: 10,
    justifyContent: "flex-end", // Ensures it's aligned to the right

  },
  moreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#eeba2b",
  },
  subTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: "#eeba2b",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default GuestListAdmin;
