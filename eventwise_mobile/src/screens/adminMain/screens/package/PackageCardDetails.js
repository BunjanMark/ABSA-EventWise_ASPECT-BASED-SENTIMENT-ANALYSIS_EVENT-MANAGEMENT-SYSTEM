// src/screens/PackageCardDetailsScreen.js
import { useState } from "react";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { fetchPackageServiceDetails } from "../../../../services/organizer/adminPackageServices";
import { useEffect } from "react";
const PackageCardDetails = ({ route, navigation }) => {
  const { packageData } = route.params; // Retrieve the package data passed through navigation
  const [serviceDetails, setServiceDetails] = useState([]);
  if (!packageData) {
    // Handle the case when packageData is undefined
    return <Text>Loading...</Text>;
  }
  // useEffect(() => {
  //   const fetchDetails = async () => {
  //     if (packageData) {
  //       const details = await fetchPackageServiceDetails(packageData.id);
  //       setServiceDetails(details);
  //       setLoading(false);
  //       console.log("Service Details: ", details);
  //     }
  //   };
  //   fetchDetails();
  // }, [packageData]);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (packageData) {
          const details = await fetchPackageServiceDetails(packageData.id);
          setServiceDetails(details);
        }
      } catch (error) {
        console.log("Error fetching package service details: ", error);
      }
    };
    fetchDetails();
  }, [packageData]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Displaying package cover photo */}
        <Image
          source={{ uri: packageData?.coverPhoto }}
          style={styles.coverPhoto}
        />

        <Text style={styles.title}>{packageData?.packageName}</Text>
        <Text style={styles.eventType}>
          Event Type: {packageData?.eventType}
        </Text>
        <Text style={styles.totalPrice}>
          Total Price: ₱{packageData?.totalPrice}
        </Text>

        <Text style={styles.sectionTitle}>Package Services:</Text>
        {serviceDetails.map((service, index) => (
          <View key={index} style={styles.serviceContainer}>
            <Text style={styles.serviceName}>{service.serviceName}</Text>
            <Text style={styles.serviceCategory}>
              Category: {service.serviceCategory}
            </Text>
            <Text style={styles.servicePrice}>Price: ₱{service.basePrice}</Text>
            <Text style={styles.serviceFeatures}>
              Features: {service.serviceFeatures.join(", ")}
            </Text>
          </View>
        ))}
        <Text style={styles.sectionTitle}>Created At:</Text>
        <Text style={styles.createdAt}>
          {new Date(packageData?.created_at).toLocaleString()}
        </Text>

        <Text style={styles.sectionTitle}>Last Updated:</Text>
        <Text style={styles.updatedAt}>
          {new Date(packageData?.updated_at).toLocaleString()}
        </Text>

        {/* Edit Button */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("EditPackageScreen", { packageData })
            }
          >
            <Text style={styles.buttonText}>Edit Package</Text>
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

export default PackageCardDetails;
