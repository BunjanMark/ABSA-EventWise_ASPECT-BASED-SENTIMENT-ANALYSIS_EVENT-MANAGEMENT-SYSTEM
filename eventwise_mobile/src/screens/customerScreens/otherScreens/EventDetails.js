import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-root-toast";
import Header from "../elements/Header";
import Icon from 'react-native-vector-icons/FontAwesome';

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const eventKeys = keys.filter(key => key.startsWith('@booked_events:'));
        const events = await AsyncStorage.multiGet(eventKeys);

        const filteredEvents = events
          .map(([key, value]) => {
            try {
              return JSON.parse(value);
            } catch (e) {
              console.error(`Error parsing JSON for key ${key}:`, e);
              return null;
            }
          })
          .filter(event => event !== null)
          .reverse(); 

        setEventDetails(filteredEvents);
      } catch (e) {
        console.error('Error fetching event details:', e);
        showToast('Failed to fetch event details.');
      }
    };

    fetchEventDetails();
  }, []);

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };

  const confirmDeleteEvent = (eventDate) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this event?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => handleDeleteEvent(eventDate) }
      ],
      { cancelable: false }
    );
  };

  const handleDeleteEvent = async (eventDate) => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const eventKeys = keys.filter(key => key.startsWith('@booked_events:'));
      const events = await AsyncStorage.multiGet(eventKeys);

      const eventKey = events.find(([key, value]) => {
        try {
          const event = JSON.parse(value);
          return event.eventDate === eventDate;
        } catch (e) {
          console.error(`Error parsing JSON for key ${key}:`, e);
          return false;
        }
      })?.[0];

      if (eventKey) {
        await AsyncStorage.removeItem(eventKey);
        setEventDetails((prevDetails) =>
          prevDetails.filter((event) => event.eventDate !== eventDate)
        );
        showToast("Event deleted successfully!");
      } else {
        showToast("Event not found.");
      }
    } catch (e) {
      console.error("Error deleting event:", e);
      showToast("Failed to delete event.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../pictures/bg.png")}
        style={styles.backgroundImage}
      >
        <Header />
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Event Details</Text>
          </View>
          {eventDetails.length === 0 ? (
            <Text style={styles.errorText}>No events booked yet.</Text>
          ) : (
            eventDetails.map((event, index) => (
              <View key={index} style={styles.eventContainer}>
                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>Event Type:</Text>
                  <Text style={styles.detailValue}>{event.eventType}</Text>
                </View>
                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>Event Name:</Text>
                  <Text style={styles.detailValue}>{event.eventName}</Text>
                </View>
                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>Description:</Text>
                  <Text style={styles.detailValue}>{event.description}</Text>
                </View>
                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>Event Date:</Text>
                  <Text style={styles.detailValue}>{event.eventDate}</Text>
                </View>
                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>Invitation Message:</Text>
                  <Text style={styles.detailValue}>{event.invitationMessage}</Text>
                </View>
                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>People to Invite:</Text>
                  <Text style={styles.detailValue}>{event.peopleToInvite}</Text>
                </View>
                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>Selected Package:</Text>
                  <Image source={event.package} style={styles.detailImage} />
                </View>
                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>Venue Location:</Text>
                  <Image source={event.eventLocation} style={styles.detailImage} />
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => confirmDeleteEvent(event.eventDate)}
                >
                  <Icon name="trash" size={20} color="#fff" />
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
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
  closeButton: {
    alignSelf: "flex-start",
    padding: 10,
    marginTop: 5,
    marginLeft: 5,
  },
  eventContainer: {
    backgroundColor: "rgba(84, 84, 84, 0.9)",
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  detailGroup: {
    marginBottom: 10,
  },
  detailLabel: {
    color: '#e6b800',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
  },
  detailValue: {
    fontSize: 18,
    color: '#000',
    backgroundColor: '#fff',
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  detailImage: {
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d9534f",
    padding: 8,
    borderRadius: 20,
    marginTop: 50,
    margin: 120,
    marginBottom: 10,
  },
  deleteButtonText: {
    color: "#fff",
    marginLeft: 8
  }
});

export default EventDetails;
