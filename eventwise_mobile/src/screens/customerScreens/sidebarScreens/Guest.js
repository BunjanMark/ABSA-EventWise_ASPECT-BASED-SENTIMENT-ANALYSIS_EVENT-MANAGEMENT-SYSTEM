import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import API_URL from '../../../constants/constant';
import Header2 from '../elements/Header2';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the 3-dot icon
import Modal from 'react-native-modal'; // For showing modal
import { TextInput, Button, Menu, Divider } from 'react-native-paper';

const GuestList = () => {
  const route = useRoute();
  const { eventId, eventName } = route.params;
  const [guests, setGuests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [updatedGuestName, setUpdatedGuestName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const [updatedRole, setUpdatedRole] = useState('');
  const [visible, setVisible] = useState(false); // For dropdown visibility
  const [guestForDropdown, setGuestForDropdown] = useState(null); // Track selected guest for the dropdown
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // For deletion confirmation modal

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/guests/${eventId}`);
        setGuests(response.data);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };

    fetchGuests();
  }, [eventId]);

  const handleUpdateGuest = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/api/guests/${selectedGuest.id}`,
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

  const handleConfirmDelete = async () => {
    if (selectedGuest && selectedGuest.id) {
      try {
        await axios.delete(`${API_URL}/api/guests/${selectedGuest.id}`);
        setGuests(guests.filter(guest => guest.id !== selectedGuest.id));
        setDeleteModalVisible(false);
        window.alert('Guest deleted successfully!');
      } catch (error) {
        console.error('Error deleting guest:', error);
      }
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
    <>
      <Header2 />
      <View style={styles.container}>
        <Text style={styles.header}>Guest List for {eventName}</Text>
        {guests.length > 0 ? (
          <FlatList
            data={guests}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
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
            )}
          />
        ) : (
          <Text style={styles.noGuests}>No guests found for this event.</Text>
        )}
      </View>

      {/* Modal for editing guest details */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="fadeIn"   // Fade-in animation when opening
        animationOut="fadeOut" // Fade-out animation when closing
        backdropOpacity={0.7}  // Make the background slightly opaque
      >
        <View style={styles.modalContent}>
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

      {/* Delete Confirmation Modal */}
      <Modal
        isVisible={deleteModalVisible}
        onBackdropPress={() => setDeleteModalVisible(false)}
        animationIn="fadeIn"   // Fade-in animation when opening
        animationOut="fadeOut" // Fade-out animation when closing
        backdropOpacity={0.7}  // Make the background slightly opaque
      >
        <View style={styles.deleteModalContent}>
          <Text style={styles.modalTitle}>
            Are you sure you want to delete the following guest?
          </Text>
          <View style={styles.guestContainerWithBorder}>
            <Text style={styles.guestName}>{selectedGuest?.GuestName}</Text>
            <Text style={styles.guestInfo}>Email: {selectedGuest?.email}</Text>
            <Text style={styles.guestInfo}>Phone: {selectedGuest?.phone}</Text>
            <Text style={styles.guestInfo}>Role: {selectedGuest?.role}</Text>
          </View>
          <Button
            mode="contained"
            style={styles.deleteButton}
            onPress={handleConfirmDelete}
          >
            Yes, Remove
          </Button>
          <Button
            mode="outlined"
            style={styles.cancelButton}
            onPress={() => setDeleteModalVisible(false)}
          >
            Cancel
          </Button>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    borderColor: '#eeba2b',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#f8f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
  },
  guestContainer: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  selectedGuestContainer: {
    borderColor: '#ffcc00',
    borderWidth: 2,
  },
  guestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  guestInfo: {
    fontSize: 14,
    color: '#777',
  },
  menu: {
    minWidth: 150,
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
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: 15,
  },
  updateButton: {
    marginTop: 20,
    width: '100%',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'red',
    width: '100%',
  },
  noGuests: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
  },
});

export default GuestList; 
