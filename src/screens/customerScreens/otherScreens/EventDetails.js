import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header2 from '../elements/Header2';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Toast from "react-native-root-toast";
import { useNavigation, useRoute } from '@react-navigation/native';

const EventDetails = ({ route }) => {
  
  const [eventData, setEventData] = useState(null);
  const navigation = useNavigation();

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, { duration: Toast.durations.LONG });
  };

  useEffect(() => {
    const loadEventDetails = async () => {
      try {
        const eventName = route.params?.event?.eventName || await AsyncStorage.getItem('eventName');
        const eventType = route.params?.event?.eventType || await AsyncStorage.getItem('eventType');
        const selectedDate = route.params?.event?.selectedDate || await AsyncStorage.getItem('selectedDate');
        const venue = route.params?.event?.venue || await AsyncStorage.getItem('selectedVenueLocation');
        const guests = route.params?.event?.guests || JSON.parse(await AsyncStorage.getItem('guests')) || [];
        const savedPackage = route.params?.event?.package || await AsyncStorage.getItem('selectedPackage');
        const totalPrice = route.params?.event?.totalPrice || await AsyncStorage.getItem('totalPrice');
        
        const packageData = savedPackage ? JSON.parse(savedPackage) : null;
  
        setEventData({
          eventName,
          eventType,
          selectedDate,
          package: packageData,
          venue,
          guests,
          totalPrice,
        });
      } catch (error) {
        console.error('Error loading event details:', error);
      }
    };
    
    loadEventDetails();
  }, [route.params?.event]);   
  
  const calculateTotalPrice = (packages) => {
    return packages.reduce((total, pkg) => total + pkg.price, 0);
  };

  const confirmDeleteEvent = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete all event details?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: handleDeleteEvent },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteEvent = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const eventKeys = keys.filter((key) => key.startsWith("@booked_events:"));

        await AsyncStorage.multiRemove(eventKeys);
        setEventData(null); // Clear event data from state
        showToast("All event details deleted successfully!");

        // Instead of navigate, we can use goBack to return to the previous screen
        navigation.goBack(); 
    } catch (e) {
        console.error("Error deleting events:", e);
        showToast("Failed to delete event details.");
    }

    await loadEvents();
};

  if (!eventData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading event details...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header2 />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Event Details</Text>
        </View>        
        <View style={styles.eventContainer}>
          <View style={styles.detailGroup}>
            <Text style={styles.detailLabel}>Event Name:</Text>
            <Text style={styles.detailValue}>{eventData.eventName || 'No event name available'}</Text>
          </View>
          <View style={styles.detailGroup}>
            <Text style={styles.detailLabel}>Event Type:</Text>
            <Text style={styles.detailValue}>{eventData.eventType}</Text>
          </View>
          <View style={styles.detailGroup}>
            <Text style={styles.detailLabel}>Event Date:</Text>
            <Text style={styles.detailValue}>{eventData.selectedDate}</Text>
          </View>
  
          <View style={styles.detailGroup}>
            <Text style={styles.detailLabel}>Selected Package:</Text>
            {/* CUSTOMIZE PACKAGE */}
            {Array.isArray(eventData.package) ? (
              <View>
                {eventData.package.map((pkg, idx) => (
                  <View key={idx} style={styles.serviceItem}>
                    <Image
                      source={pkg.image}
                      style={styles.serviceImage}
                    />
                    <View style={styles.serviceS}>
                      <Text style={styles.serviceName}>{pkg.name}</Text>
                      <Text style={styles.serviceType}>{pkg.type}</Text>
                      <Text style={styles.servicePrice}>{pkg.price}k</Text>
                    </View>
                  </View>
                ))}
                <Text style={styles.totalPrice}>
                  Total Price: {calculateTotalPrice(eventData.package)}k
                </Text>
              </View>
            ) : // PACKAGE (NOT CUSTOMIZE)
            eventData.package ? (
              <Image source={eventData.package} style={styles.detailImage} />
            ) : (
              <Text style={styles.detailValue}>No package available</Text>
            )}
          </View>
          <View style={styles.detailGroup}>
            <Text style={styles.detailLabel}>Venue Location:</Text>
            <Text style={styles.detailValue}>{eventData.venue}</Text>
          </View>
          <View style={styles.detailGroup}>
            <Text style={styles.detailLabel}>Guests:</Text>
            {eventData.guests.map((guest, index) => (
              <View key={index} style={styles.guestValue}>
                <Text style={styles.guestName}>{guest.name}</Text>
                <Text style={styles.guestEmail}>{guest.email}</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={confirmDeleteEvent}
        >
          <Icon name="trash" size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
    marginTop: 8,
  },
  headerText: {
    color: "#e6b800",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins",
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
    color: "#e6b800",
    fontSize: 16,
    fontWeight: "bold",
    margin: 20,
    fontFamily: "Poppins",
  },
  detailValue: {
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
    fontFamily: "Poppins",
  },
  guestValue: {
    backgroundColor: "#fff",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  guestName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "Poppins",
  },
  guestEmail: {
    fontSize: 15,
    color: 'gray',
    fontFamily: "Poppins",
  },
  detailImage: {
    alignSelf: "center",
    marginTop: 5,
    color: "#fff",
    resizeMode: "cover",
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  serviceImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
  },
  serviceS: {
    marginLeft: 10,
    justifyContent: "center",
  },
  serviceName: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    color: "#fff",
    fontFamily: "Poppins",
  },
  serviceType: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    fontFamily: "Poppins",
    color: "#fff",
  },
  servicePrice: {
    fontSize: 16,
    marginLeft: 10,
    color: "#fff",
    fontFamily: "Poppins",
  },
  totalPrice: {
    fontSize: 17,
    marginLeft: 15,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Poppins",
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
    marginLeft: 8,
    fontFamily: "Poppins",
  },
});

export default EventDetails;