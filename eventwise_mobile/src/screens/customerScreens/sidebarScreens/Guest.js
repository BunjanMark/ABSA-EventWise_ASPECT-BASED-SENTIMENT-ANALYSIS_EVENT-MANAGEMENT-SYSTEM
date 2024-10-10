import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput, Button, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header2 from "../elements/Header2";

const Guest = () => {
  const route = useRoute();
  const { event } = route.params || {};
  const { id: eventId, eventName } = event || {};

  const [guestList, setGuestList] = useState([]);
  const [editingGuest, setEditingGuest] = useState(null);
  const [guestDetails, setGuestDetails] = useState({ name: '', email: '' });
  const [groupedGuests, setGroupedGuests] = useState({});

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await fetch('http://192.168.1.39:5000/api/guests'); 
      if (response.ok) {
        const data = await response.json();
        groupGuestsByEvent(data); 
      } else {
        throw new Error('Failed to fetch guests');
      }
    } catch (error) {
      console.error('Error fetching guests:', error);
      Alert.alert('Error', 'Failed to load guests');
    }
  };

  const groupGuestsByEvent = (guests) => {
    const grouped = guests.reduce((acc, guest) => {
      if (!acc[guest.eventName]) {
        acc[guest.eventName] = [];
      }
      acc[guest.eventName].push(guest);
      return acc;
    }, {});

    setGroupedGuests(grouped);
  };

  const handleEditGuest = (guest) => {
    setEditingGuest(guest.id);
    setGuestDetails({ name: guest.name, email: guest.email });
  };

  const handleSaveGuest = () => {
    setGuestList(prevList =>
      prevList.map(guest =>
        guest.id === editingGuest ? { ...guest, ...guestDetails } : guest
      )
    );
    setEditingGuest(null);
  };

  const handleCancelEdit = () => {
    setEditingGuest(null);
  };

  const handleDeleteGuest = (guestId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this guest?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => deleteGuest(guestId) }
      ],
      { cancelable: false }
    );
  };

  const deleteGuest = async (guestId) => {
    try {
      const response = await fetch(`http://192.168.1.39:5000/api/guests/${guestId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        fetchGuests(); 
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to delete guest: ${errorText}`);
      }
    } catch (error) {
      console.error('Error deleting guest:', error);
      Alert.alert('Error', 'Failed to delete guest');
    }
  };  

  const renderGuest = ({ item }) => (
    <View style={styles.guestContainer}>
      {editingGuest === item.id ? (
        <View>
          <TextInput
            style={styles.input}
            value={guestDetails.name}
            onChangeText={(text) => setGuestDetails({ ...guestDetails, name: text })}
          />
          <TextInput
            style={styles.input}
            value={guestDetails.email}
            onChangeText={(text) => setGuestDetails({ ...guestDetails, email: text })}
          />
          <View style={styles.actionsContainer}>
            <Button title="Save" onPress={handleSaveGuest} />
            <Button title="Cancel" onPress={handleCancelEdit} />
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.guestName}>{item.name}</Text>
          <Text style={styles.guestEmail}>{item.email}</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => handleEditGuest(item)} style={styles.actionButton}>
              <Icon name="edit" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteGuest(item.id)} style={styles.actionButton}>
              <Icon name="trash" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  const renderEventSection = (eventName, guests) => (
    <View style={styles.tableBg} key={eventName}>
      <View style={styles.tableHeaderText}>
        <Text style={styles.textHe}>{eventName}</Text>
      </View>
      <Text style={styles.tableSubText}>People Invited</Text>
      <View style={styles.tableNameEmail}>
        <FlatList
          data={guests}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} 
          renderItem={renderGuest}
        />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
        <Header2 />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Guest List</Text>
            <Text style={styles.sub}>People Invited</Text>
          </View>
          {Object.entries(groupedGuests).map(([eventName, guests]) =>
            renderEventSection(eventName, guests)
          )}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 8,
  },
  headerText: {
    color: '#e6b800',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sub: {
    color: '#555',
    fontSize: 15,
    fontWeight: 'bold',
  },
  tableBg: {
    margin: -5,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  tableNameEmail: {
    margin: 10,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  tableHeaderText: {
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  textHe: {
    alignItems: "center",
    marginBottom: 5,
    color: 'black',
    fontWeight: "bold",
  },
  tableSubText: {
    marginTop: 20,
    color: "black",
    fontWeight: "bold",
  },
  guestContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  guestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "black"
  },
  guestEmail: {
    fontSize: 16,
    color: 'gray',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionButton: {
    marginHorizontal: 5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
    color: "black"
  },
});

export default Guest;
