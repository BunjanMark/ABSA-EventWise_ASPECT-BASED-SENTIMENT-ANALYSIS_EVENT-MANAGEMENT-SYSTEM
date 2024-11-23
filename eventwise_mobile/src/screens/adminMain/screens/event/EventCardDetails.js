import { View, Text, ScrollView, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import React from "react";
import { fetchEvents } from "../../../../services/organizer/adminEventServices";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
const EventCardDetails = ({ route, navigation }) => {
  const { eventData } = route.params;
  const [serviceDetails, setServiceDetails] = useState([]);
  const [packageDetails, setPackageDetails] = useState([]);
  if (!eventData) {
    return <Text>Loading...</Text>;
  }

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (eventData) {
          const details = await fetchEventPackageDetails(eventData.id);
          setPackageDetails(details);
        }
      } catch (error) {
        console.log("something went wrong inside admincard details.");
      }
    };
    fetchDetails();
  }, [eventData]);

  console.log(
    "event data inside eventCard Detials: " + JSON.stringify(eventData)
  );
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Displaying package cover photo */}
        <Image
          source={{ uri: eventData?.coverPhoto }}
          style={styles.coverPhoto}
        />

        <Text style={styles.title}>{eventData?.name}</Text>
        <Text style={styles.eventType}>Event Type: {eventData?.type}</Text>
        <Text style={styles.totalPrice}>
          {/* Total Price: ₱{eventData?.totalPrice} */}
          Total Price: N/a
        </Text>

        <Text style={styles.sectionTitle}>Package Services:</Text>
        {packageDetails.map((currentPackage, index) => (
          <View key={index} style={styles.serviceContainer}>
            <Text style={styles.serviceName}>{currentPackage.packageName}</Text>
            <Text style={styles.serviceCategory}>
              Category: {currentPackage.serviceCategory}
            </Text>
            <Text style={styles.servicePrice}>
              Price: ₱{currentPackage.basePrice}
            </Text>
            <Text style={styles.serviceFeatures}>
              Features: {currentPackage.serviceFeatures.join(", ")}
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
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("EditPackageScreen", { eventData })
            }
          >
            <Text style={styles.buttonText}>Edit Event</Text>
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
    color: "#ff9900",
    marginBottom: 10,
  },
  services: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    lineHeight: 22,
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
  },
  editButton: {
    backgroundColor: "#ff9900",
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
});

export default EventCardDetails;
