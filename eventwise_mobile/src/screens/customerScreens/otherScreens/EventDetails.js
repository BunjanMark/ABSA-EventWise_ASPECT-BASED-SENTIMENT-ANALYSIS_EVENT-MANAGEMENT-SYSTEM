import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import Header from "../elements/Header";
import axios from 'axios';
import API_URL from '../../../constants/constant';
import { fetchEventPackageDetails } from "../../../services/organizer/adminEventServices";

const EventDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { eventId } = route.params;
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // Fetch event data
        const eventResponse = await axios.get(`${API_URL}/api/admin/events/${eventId}`);
        const eventDetails = eventResponse.data;

        // Fetch package details
        const packageDetails = await fetchEventPackageDetails(eventId);

        // Combine event and package details
        setEventData({ ...eventDetails, packages: packageDetails });
      } catch (error) {
        console.error("Error fetching event or package data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
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

        {/* Event Details */}
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Event Name:</Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detailValue}>{eventData.name}</Text>
          </View>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Date:</Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detailValue}>{eventData.date}</Text>
          </View>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Location:</Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detailValue}>{eventData.location}</Text>
          </View>
        </View>
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Guests:</Text>
          <View style={styles.detailContainer}>
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
        </View>

        {/* Packages */}
        <View style={styles.detailGroup}>
          <Text style={styles.detailLabel}>Packages:</Text>
          {Array.isArray(eventData.packages) && eventData.packages.length > 0 ? (
            eventData.packages.map((packageItem, index) => (
              <View key={index} style={styles.detailContainer}>
                <Text style={styles.detailValue}>
                  {packageItem.packageName} - {packageItem.totalPrice} 
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.detailContainer}>
              <Text style={styles.detailValue}>No packages available.</Text>
            </View>
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
  detailContainer: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 4,
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
  },
});

export default EventDetails;