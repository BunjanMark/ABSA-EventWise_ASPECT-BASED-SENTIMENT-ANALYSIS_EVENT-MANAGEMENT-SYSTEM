import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import Header from "../elements/Header";
import axios from 'axios';
import API_URL from '../../../constants/constant';

const EventDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { eventId } = route.params;
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
  .get(`${API_URL}/api/admin/events/${eventId}`)
  .then((response) => {
    console.log('Event data with everything:', response.data);
    setEventData(response.data);
    setLoading(false);
  })
  .catch((error) => {
    console.error('Error fetching event data:', error);
    setLoading(false);
  });

  }, [eventId]);
  
  
  if (loading) {
    return <ActivityIndicator size="large" color="#eeba2b" />;
  }

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#eeba2b" style={{ marginBottom: 10 }} />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerText}>Event Details</Text>
        </View>

        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Event Name:</Text>
          <Text style={styles.detailValue}>{eventData.name}</Text>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{eventData.date}</Text>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>{eventData.location}</Text>
        </View>
        <View style={styles.detailGroup}>
  <Text style={styles.detailLabel}>Guests:</Text>
  {eventData.guest && eventData.guest.length > 0 ? (
    eventData.guest.map((guest, index) => (
      <Text key={index} style={styles.detailValue}>
        {guest.GuestName} - {guest.email}
      </Text>
    ))
  ) : (
    <Text style={styles.detailValue}>No guests available.</Text>
  )}
</View>

<View style={styles.detailGroup}>
  <Text style={styles.detailLabel}>Packages:</Text>
  {Array.isArray(eventData.packages) && eventData.packages.length > 0 ? (
    eventData.packages.map((packageItem, index) => (
      <Text key={index} style={styles.detailValue}>
        {packageItem.name} - {packageItem.price} USD
      </Text>
    ))
  ) : (
    <Text style={styles.detailValue}>No packages available.</Text>
  )}
</View>





      </ScrollView>
    </>
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
  },
});

export default EventDetails;
