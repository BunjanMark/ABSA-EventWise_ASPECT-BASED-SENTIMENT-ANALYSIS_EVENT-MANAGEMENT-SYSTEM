import { View, Text, ScrollView, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import React from "react";
import {
  approveBookingEvent,
  fetchEventPackageDetails,
  fetchEvents,
  fetchUserBookingEvents,
} from "../../../../services/organizer/adminEventServices";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';


const EventBookingDetails = ({ route, navigation }) => {
  const { eventData, userBookingDetails } = route.params;
  const [serviceDetails, setServiceDetails] = useState([]);
  const [packageDetails, setPackageDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  if (!eventData) {
    return <Text>Loading...</Text>;
  }

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (eventData) {
          const details = await fetchEventPackageDetails(eventData.id);
          setPackageDetails(details);
          console.log(
            "event data inside EventBooking Detials: " +
              JSON.stringify(eventData) +
              " this is the owner of the event" +
              JSON.stringify(userBookingDetails)
          );

          // console.log(
          //   "--------------------------------",
          //   eventData.id,
          //   eventData.user_id
          // );
          // const UserBookingDetails = await fetchUserBookingEvents(
          //   eventData.id,
          //   eventData.user_id
          // );
          // setUserBookingDetails(UserBookingDetails);
        }
      } catch (error) {
        console.log("something went wrong inside eventBookingDetails details.");
      }
    };
    fetchDetails();
  }, [eventData]);
  // console.log("mao nani ron", userBookingDetails); //ADmin output
  const handlingApproveButton = async (eventid) => {
    setIsLoading(true);
    try {
      const response = await approveBookingEvent(eventid);
      setIsLoading(false);
      console.log("Approve!!" + response);
      Alert.alert("Success", "Booking approved successfully!");
    } catch (error) {
      console.log("Error approving booking: ", error);
      setIsLoading(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
     <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#FFCE00" marginBottom={10} />
            </TouchableOpacity>
      <View style={styles.card}>
        {/* Displaying package cover photo */}
        <Image
          source={{ uri: eventData?.coverPhoto }}
          style={styles.coverPhoto}
        />

        <Text style={styles.title}>{eventData?.name}</Text>
        <Text style={styles.title}>
          Booked by: {userBookingDetails?.service_provider_name}
        </Text>
        <Text style={styles.eventType}>Event Type: {eventData?.type}</Text>
        <Text style={styles.totalPrice}>
          {/* Total Price: ₱{eventData?.totalPrice} */}
          Total Price: N/a
        </Text>

        <Text style={styles.sectionTitle}>Event Details</Text>
        <View style={styles.eventDetailsContainer}>
          <View style={styles.eventDetail}>
            <Text style={styles.eventDetailLabel}>Date:</Text>
            <Text style={styles.eventDetailValue}>
              {new Date(eventData?.date).toLocaleString()}
            </Text>
          </View>
          <View style={styles.eventDetail}>
            <Text style={styles.eventDetailLabel}>Time:</Text>
            <Text style={styles.eventDetailValue}>{eventData?.time}</Text>
          </View>
          <View style={styles.eventDetail}>
            <Text style={styles.eventDetailLabel}>Location:</Text>
            <Text style={styles.eventDetailValue}>{eventData?.location}</Text>
          </View>
          <View style={styles.eventDetail}>
            <Text style={styles.eventDetailLabel}>Description:</Text>
            <Text style={styles.eventDetailValue}>
              {eventData?.description}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Package Services:</Text>
        {packageDetails?.map((currentPackage, index) => (
          <View key={index} style={styles.serviceContainer}>
            <Text style={styles.serviceName}>{currentPackage.packageName}</Text>
            <Text style={styles.serviceCategory}>
              Category: {currentPackage.serviceCategory}
            </Text>
            <Text style={styles.servicePrice}>
              Price: ₱{currentPackage.basePrice}
            </Text>
            <Text style={styles.serviceFeatures}>
              Features: {currentPackage.serviceFeatures?.join(", ")}
            </Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Created At:</Text>
        <Text style={styles.createdAt}>
          {new Date(eventData?.created_at).toLocaleString()}
        </Text>

        <Text style={styles.sectionTitle}>Last Updated:</Text>
        <Text style={styles.updatedAt}>
          {new Date(eventData?.updated_at).toLocaleString()}
        </Text>

        {/* Edit Button */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: "green" }]}
            onPress={() => handlingApproveButton(eventData.id)}
          >
            <Text style={styles.buttonText}>Approve Event</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: "red" }]}
            onPress={() => console.log("testing")}
          >
            <Text style={styles.buttonText}>Decline Event</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: 200,
  },
  coverPhoto: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  eventType: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#eeba2b",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  eventDetailsContainer: {
    marginBottom: 20,
  },
  eventDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  eventDetailLabel: {
    fontSize: 16,
    color: "#666",
  },
  eventDetailValue: {
    fontSize: 16,
    color: "#333",
  },
  serviceContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  serviceCategory: {
    fontSize: 14,
    color: "#666",
  },
  servicePrice: {
    fontSize: 14,
    color: "#666",
  },
  serviceFeatures: {
    fontSize: 14,
    color: "#666",
  },
  createdAt: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  updatedAt: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#ff9900",
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventBookingDetails;
