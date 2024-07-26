import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
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
        console.log('Keys:', keys);
        const events = await AsyncStorage.multiGet(keys);
        console.log('Events:', events);

        const filteredEvents = events
          .filter(([key]) => key.startsWith('@booked_events:'))
          .map(([key, value]) => {
            const event = JSON.parse(value);

            console.log('Package URL:', event.package);
            console.log('Venue Location URL:', event.eventLocation);
            
            return { ...event, key };
          });

        console.log('Filtered Events:', filteredEvents);

        filteredEvents.sort((a, b) => parseInt(b.key.split(':')[1]) - parseInt(a.key.split(':')[1]));

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

  const renderImage = (uri) => {
    return uri ? (
      <Image
        source={{ uri }}
        style={styles.image}
        resizeMode="cover"
        onError={() => console.log('Failed to load image from URI:', uri)}
      />
    ) : (
      <Text style={styles.detailValue}>Image not available</Text>
    );
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
                  <Text style={styles.detailLabel}>Event Date:</Text>
                  <Text style={styles.detailValue}>{event.eventDate}</Text>
                </View>
                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>Venue Location:</Text>
                  {renderImage(event.eventLocation)}
                </View>
                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>Description:</Text>
                  <Text style={styles.detailValue}>{event.description}</Text>
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
                  {renderImage(event.package)}
                </View>
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
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailGroup: {
    marginBottom: 10,
  },
  detailLabel: {
    color: '#e6b800',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailValue: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
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
});

export default EventDetails;
