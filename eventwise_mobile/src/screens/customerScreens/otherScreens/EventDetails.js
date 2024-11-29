import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header2 from '../elements/Header2';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const EventDetails = () => {
  const eventData = {
    eventType: "Wedding",
    eventName: "John & Jane's Wedding",
    location: "Grand Ballroom, City Center",
    date: "2025-06-20",
    selectedPackage: "Gold Package",
    guests: [
      { name: "Alice Smith", email: "alice@example.com" },
      { name: "Bob Johnson", email: "bob@example.com" },
    ],
  };

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Header2 />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#eeba2b" style={{ marginBottom: 10 }} />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerText}>Event Details</Text>
        </View>

        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Event Type:</Text>
          <Text style={styles.detailValue}>{eventData.eventType}</Text>
        </View>

        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Event Name:</Text>
          <Text style={styles.detailValue}>{eventData.eventName}</Text>
        </View>

        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>{eventData.location}</Text>
        </View>

        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{eventData.date}</Text>
        </View>

        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Selected Package:</Text>
          <Text style={styles.detailValue}>{eventData.selectedPackage}</Text>
        </View>

        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Guests:</Text>
          {eventData.guests.map((guest, index) => (
            <View key={index} style={styles.guestItem}>
              <Text style={styles.guestName}>{guest.name}</Text>
              <Text style={styles.guestEmail}>{guest.email}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e6b800',
  },
  detailGroup: {
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailValue: {
    fontSize: 14,
    color: '#555',
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  guestItem: {
    marginTop: 5,
  },
  guestName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  guestEmail: {
    fontSize: 14,
    color: '#777',
  },
});

export default EventDetails;
