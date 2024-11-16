// src/screens/EditPackage.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { updatePackage } from "../../../../services/organizer/adminPackageServices";

const EditPackageScreen = ({ route, navigation }) => {
  const { packageData } = route.params; // Retrieve the package data passed through navigation

  // Set initial state from the passed package data
  const [packageName, setPackageName] = useState(packageData.packageName);
  const [eventType, setEventType] = useState(packageData.eventType);
  const [totalPrice, setTotalPrice] = useState(
    packageData.totalPrice.toString()
  ); // Ensure price is a string for TextInput
  const [services, setServices] = useState(packageData.services.join(", ")); // Convert services array to string for TextInput
  const [coverPhoto, setCoverPhoto] = useState(packageData.coverPhoto);

  // Handle the update logic
  const handleUpdatePackage = async () => {
    try {
      // Create the updated package data
      const updatedData = {
        packageName,
        eventType,
        totalPrice: parseFloat(totalPrice), // Ensure price is a number
        services: services.split(", "), // Convert services string back to array
        coverPhoto,
      };
      await updatePackage(packageData.id, updatedData); // Update the package
      Alert.alert("Success", "Package updated successfully!");
      navigation.goBack(); // Navigate back after updating
    } catch (error) {
      console.error("Failed to update package", error);
      Alert.alert("Error", "Failed to update package");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Package</Text>

      <TextInput
        style={styles.input}
        value={packageName}
        onChangeText={setPackageName}
        placeholder="Package Name"
      />
      <TextInput
        style={styles.input}
        value={eventType}
        onChangeText={setEventType}
        placeholder="Event Type"
      />
      <TextInput
        style={styles.input}
        value={totalPrice}
        onChangeText={setTotalPrice}
        placeholder="Total Price"
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, styles.servicesInput]}
        value={services}
        onChangeText={setServices}
        placeholder="Services"
        multiline
      />
      <TextInput
        style={styles.input}
        value={coverPhoto}
        onChangeText={setCoverPhoto}
        placeholder="Cover Photo URL"
      />

      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdatePackage}
      >
        <Text style={styles.buttonText}>Update Package</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff9900",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  servicesInput: {
    height: 100, // To allow multiline input
    textAlignVertical: "top", // Align text to the top for multiline
  },
  updateButton: {
    backgroundColor: "#ff9900",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default EditPackageScreen;
