import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-root-toast";
import Header from "../elements/Header";
import Icon from 'react-native-vector-icons/FontAwesome';

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { event } = route.params || {};
  
  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };

  useEffect(() => {
    if (event) {
      setEventDetails([event]);
    } else {
      fetchEventDetails();
    }
  }, [event]);

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

  const calculateTotalPrice = (packageItems) => {
    return packageItems.reduce((total, pkg) => total + parseFloat(pkg.price), 0);
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
                  {/* CUSTOMIZE PACKAGE */}
                  {Array.isArray(event.package) ? (
                    <View>
                      {event.package.map((pkg, idx) => (
                        <View key={idx} style={styles.serviceItem}>
                          <Image source={pkg.image} style={styles.serviceImage} />
                          <View style={styles.serviceS}>
                            <Text style={styles.serviceName}>{pkg.name}</Text>
                            <Text style={styles.serviceType}>{pkg.type}</Text>
                            <Text style={styles.servicePrice}>{pkg.price}k</Text>
                          </View>
                        </View>
                      ))}
                      <Text style={styles.totalPrice}>
                        Total Price: {calculateTotalPrice(event.package)}k
                      </Text>
                    </View>                  
                  // PACKAGE (NOT CUSTOMIZE)
                  ) : event.package ? (
                    <Image source={event.package} style={styles.detailImage} />
                  ) : (
                    <Text style={styles.detailValue}>No package available</Text>
                  )}
                </View>
                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>Venue Location:</Text>
                  <Text style={styles.detailValue}>{event.eventLocation}</Text>
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
    alignSelf: "center",
    marginTop: 10,
    color: "#fff"
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
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  serviceS: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  serviceName: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
    color: '#fff',
  },
  serviceType: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    color: '#fff',
  },
  servicePrice: {
    fontSize: 16,
    marginLeft: 10,
    color: '#fff',
  },
  totalPrice: {
    fontSize: 20,
    marginLeft: 15,
    color: '#fff',
    fontWeight: "bold"
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
