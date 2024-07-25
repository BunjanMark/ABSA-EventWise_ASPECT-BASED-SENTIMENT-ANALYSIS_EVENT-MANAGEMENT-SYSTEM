import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-root-toast";
import Header from "../elements/Header";
import Icon from 'react-native-vector-icons/FontAwesome';

const Event = () => {
  const [eventDetails, setEventDetails] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { eventName } = route.params || {};

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const events = await AsyncStorage.multiGet(keys);

        const filteredEvents = events
          .filter(([key]) => key.startsWith('@booked_events:'))
          .map(([key, value]) => {
            const event = JSON.parse(value);
            return { ...event, key };
          });

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

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../pictures/bg.png")}
        style={styles.backgroundImage}
      >
        <Header />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Joined Events</Text>
            <Text style={styles.sub}>Booked Event</Text>
          </View>
          {eventDetails.length === 0 ? (
            <Text style={styles.errorText}>No events booked yet.</Text>
          ) : (
            eventDetails.map((event, index) => (
              <View key={index} style={styles.eventFolder}>
                <View style={styles.leftColumn}>
                  <Image source={require("../pictures/user.png")} style={styles.accountImage} />
                    <Text style={styles.orgName}>Organizer</Text>
                </View>
                <View style={styles.centerColumn}>
                 <View style={styles.line} />
                  <Text style={styles.eventType}>{event.eventType}</Text>
                  <Text style={styles.eventLocation}>{event.eventLocation}</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('EventDetails')}
                  >
                    <Text style={styles.viewAllButton}>View All</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.rightColumn}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Feedback')}
                    style={styles.button}
                  >
                    <Icon name="thumbs-up" size={20} color="black" />
                    <Text style={styles.feedbackButton}>Feedback</Text>
                  </TouchableOpacity>
                  <View style={styles.lineLeft} />
                  <Text style={styles.eventDate}>{event.eventDate}</Text>
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
  sub: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventFolder: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  leftColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  accountImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  orgName: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  centerColumn: {
    flex: 1,
    marginLeft: 10,
  },
  line: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'gray',
    zIndex: 1,
  },
  eventType: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  eventLocation: {
    color: '#000',
    fontSize: 16,
    marginBottom: 15,
    marginLeft: 10,
  },
  viewAllButton: {
    color: '#e6b800',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e6b800",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  feedbackButton: {
    color: '#000',
    fontSize: 16,
    marginLeft: 8,
  },
  rightColumn: {
    flex: 2,
    alignItems: 'flex-end',
    flexDirection: "column",
  },
  lineLeft: {
    position: 'absolute',
    left: 70, 
    top: 55,
    bottom: 0,
    width: 1,
    height: 30,
    backgroundColor: 'gray',
    zIndex: 1,
  },
  eventDate: {
    color: '#000',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default Event;
