// AddEventOrPackageModalNew.js
import pickerSelectStyles from "./pickerSelectStyles";
import styles from "./styles";
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import useStore from "../../../../stateManagement/useStore";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select"; // Import Picker
import DateTimePicker from "@react-native-community/datetimepicker"; // Import DateTimePicker

import event2 from "../../../../../assets/event2.png"; // Ensure correct path
import selectimage from "../../../../../assets/selectimage.png"; // Ensure correct path

const AddEventOrPackageModalNew = ({ visible, onClose, type }) => {
  const { addEvent, addEventPackage, eventPackages, servicesList } = useStore();

  const addGuest = () => {
    setGuests([...guests, { name: "", email: "" }]);
  };
  // Update Guest Details
  const updateGuest = (index, field, value) => {
    setGuests((prevGuests) =>
      prevGuests.map((guest, i) =>
        i === index ? { ...guest, [field]: value } : guest
      )
    );
  };
  // State variables for multi-step form
  const [currentStep, setCurrentStep] = useState(type === "package" ? 3 : 1); // Start at step 3 if adding a package

  // Step 1: Basic Details
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventTime, setEventTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);

  // Step 2: Choose Package or Customize
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Step 3: Customize Package
  // Local state variables
  const [packageName, setPackageName] = useState("");
  const [packageEventType, setPackageEventType] = useState("");
  const [selectedServices, setSelectedServices] = useState({});
  const [packageCreatedDate, setPackageCreatedDate] = useState(new Date());

  const [totalPrice, setTotalPrice] = useState(0);
  //   Step 4: adding guests
  const [guests, setGuests] = useState([{ name: "", email: "" }]); // Array to store guest objects

  // console.log("eventPackages:", eventPackages);
  // Effect to filter packages based on event type
  useEffect(() => {
    if (eventType) {
      const packages = eventPackages.filter(
        (pkg) => pkg.eventType?.toLowerCase() === eventType.toLowerCase()
      );
      setFilteredPackages(packages);
    } else {
      setFilteredPackages([]);
    }
  }, [eventType, eventPackages]);

  // Handle service selection/deselection
  const handleServiceToggle = (category, serviceName, servicePrice) => {
    setSelectedServices((prevSelectedServices) => {
      const categoryServices = prevSelectedServices[category] || [];
      let updatedCategoryServices;
      let updatedTotalPrice = totalPrice;

      if (categoryServices.includes(serviceName)) {
        updatedCategoryServices = categoryServices.filter(
          (name) => name !== serviceName
        );
        updatedTotalPrice -= servicePrice;
      } else {
        updatedCategoryServices = [...categoryServices, serviceName];
        updatedTotalPrice += servicePrice;
      }

      return {
        ...prevSelectedServices,
        [category]: updatedCategoryServices,
      };
    });

    setTotalPrice((prevTotal) =>
      selectedServices[category]?.includes(serviceName)
        ? prevTotal - servicePrice
        : prevTotal + servicePrice
    );
  };

  // Handle adding the package to the useStore
  const handleAddPackage = async () => {
    try {
      if (!packageName || !packageEventType) {
        Alert.alert("Error", "Please fill in all required fields.");
        return;
      }

      const newPackage = {
        packageId: Date.now().toString(),
        packageName,
        eventType: packageEventType,
        services: selectedServices,
        totalPrice,
        coverPhoto,
        packageCreatedDate: packageCreatedDate.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      };

      // Add the package to the store
      const result = await addEventPackage(newPackage);
      console.log("Package added:", newPackage);
      // showToast(result?.message);
      // Reset form fields
      resetFields();
      onClose();
      alert("Package added successfully!");
    } catch (error) {
      console.error("Error adding package:", error);
      Alert.alert("Error adding package. Please try again.");
    }
  };

  const handleAdd = () => {
    if (!title || !eventType || !eventDate || !eventTime || !location) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const newEvent = {
      eventId: Date.now().toString(), // Automatically generated event ID
      eventName: title,
      eventType,
      eventDate: eventDate.toISOString().split("T")[0],
      eventTime: eventTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      eventLocation: location,
      eventDescription: description,
      EventImage: coverPhoto,
      eventPackageSelected: Object.values(selectedServices).flat(),
      eventPackageSelectedName: Object.keys(selectedServices).join(","),
      guests, // Include guests in the submission
      totalPrice: selectedPackage
        ? selectedPackage.basePrice + totalPrice
        : totalPrice,
    };

    // Add the new event to the store
    addEvent(newEvent);

    // Reset fields and close modal
    resetFields();
    onClose();
  };
  // Reset all form fields
  const resetFields = () => {
    setCurrentStep(1);
    setTitle("");
    setEventType("");
    setEventDate(new Date());
    setEventTime(new Date());
    setLocation("");
    setDescription("");
    setCoverPhoto(null);
    setFilteredPackages([]);
    setSelectedPackage(null);
    setSelectedServices({});
    setTotalPrice(0);
    setGuests([{ name: "", email: "" }]); // Reset guests to initial state
  };

  // Handle Cover Photo Selection
  const handleCoverPhotoSelection = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        setCoverPhoto(selectedUri);
      }
    } catch (error) {
      console.error("Error selecting cover photo:", error);
      Alert.alert(
        "Error",
        "An error occurred while selecting the cover photo."
      );
    }
  };

  // Handle Date Picker
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setEventDate(selectedDate);
    }
  };

  // Handle Time Picker
  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setEventTime(selectedTime);
    }
  };

  // Handle Package Selection
  // Handle Package Selection
  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setTotalPrice(0); // Reset additional services price

    // Optionally, pre-select the package's services
    if (pkg.servicesPicked) {
      const preselectedServices = pkg.servicesPicked.reduce((acc, service) => {
        const category = servicesList.find(
          (s) => s.serviceName === service
        )?.serviceCategory;
        if (category) {
          acc[category] = acc[category]
            ? [...acc[category], service]
            : [service];
        }
        return acc;
      }, {});

      setSelectedServices(preselectedServices);

      // Calculate total price based on preselected services
      const servicesTotal = pkg.servicesPicked.reduce((sum, service) => {
        const serviceObj = servicesList.find((s) => s.serviceName === service);
        return sum + (serviceObj ? serviceObj.basePrice : 0);
      }, 0);

      setTotalPrice(servicesTotal);
    }
  };

  // Proceed to Next Step
  const handleNext = () => {
    // Validate Step 1 before proceeding
    if (!title || !eventType || !eventDate || !eventTime || !location) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    setCurrentStep((currentStep) => (currentStep < 3 ? currentStep + 1 : 3));
  };

  // Proceed Back to Previous Step
  const handleBack = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // Proceed to Customize Package Step
  const handleProceedToCustomize = () => {
    if (!selectedPackage) {
      Alert.alert("Error", "Please select a package to customize.");
      return;
    }
    setCurrentStep(3);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <ScrollView contentContainerStyle={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>
            {type === "event" ? "Create Event" : "Add Event Package"}
          </Text>

          {/* Step Indicator */}
          <Text style={styles.stepIndicator}>
            Step {currentStep} of 4: testing only
          </Text>

          {currentStep === 1 && (
            <>
              {/* Cover Photo Section */}
              <TouchableOpacity
                onPress={handleCoverPhotoSelection}
                style={styles.coverPhotoContainer}
              >
                <Image
                  source={
                    coverPhoto
                      ? { uri: coverPhoto } // Show selected image
                      : selectimage // Default image
                  }
                  style={styles.coverPhoto}
                />
                <Text style={styles.addPhotoText}>Add Cover Photo</Text>
              </TouchableOpacity>

              {/* Event Name */}
              <TextInput
                placeholder={
                  type === "event" ? "Enter Event Name" : "Enter Package Name"
                }
                value={title}
                onChangeText={setTitle}
                style={styles.inputStyle}
              />

              {/* Choose Event Type Dropdown */}
              <RNPickerSelect
                onValueChange={(value) => setEventType(value)}
                placeholder={{ label: "Choose Event Type...", value: null }}
                items={[
                  { label: "Birthday", value: "Birthday" },
                  { label: "Wedding", value: "Wedding" },
                  { label: "Reunion", value: "Reunion" },
                  { label: "Conference", value: "Conference" },
                  // Add more event types as needed
                ]}
                style={pickerSelectStyles}
                value={eventType}
                useNativeAndroidPickerStyle={false}
              />

              {/* Date Picker */}
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.datePicker}
              >
                <Text style={styles.datePickerText}>
                  {eventDate ? eventDate.toLocaleDateString() : "Select Date"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={eventDate}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}

              {/* Time Picker */}
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={styles.datePicker}
              >
                <Text style={styles.datePickerText}>
                  {eventTime
                    ? eventTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Select Time"}
                </Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={eventTime}
                  mode="time"
                  display="default"
                  onChange={onTimeChange}
                />
              )}

              {/* Event Venue */}
              <TextInput
                placeholder="Enter Event Venue"
                value={location}
                onChangeText={setLocation}
                style={styles.inputStyle}
              />

              {/* Description */}
              <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={[styles.inputStyle, { height: 80 }]}
                multiline
              />

              {/* Next Button */}
              <View style={styles.buttonContainer}>
                <Button title="Next" onPress={handleNext} />
                <Button title="Close" onPress={onClose} color="#FF3B30" />
              </View>
            </>
          )}

          {currentStep === 2 && (
            <>
              {/* Choose Event Package or Customize */}
              <Text style={styles.sectionTitle}>Choose an Event Package</Text>

              {filteredPackages.length > 0 ? (
                <FlatList
                  data={filteredPackages}
                  keyExtractor={(item) => item.packageId}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.packageItem,
                        selectedPackage?.packageId === item.packageId &&
                          styles.packageItemSelected,
                      ]}
                      onPress={() => handlePackageSelect(item)}
                    >
                      <Image
                        source={
                          item.packageImage
                            ? item.packageImage
                            : // : require("../../../../../assets/package_placeholder.png") // Placeholder image
                              { event2 }
                        }
                        style={styles.packageImage}
                      />
                      <View style={styles.packageInfo}>
                        <Text style={styles.packageName}>
                          {item.packageName}
                        </Text>
                        <Text style={styles.packagePrice}>
                          Base Price: ${item.totalPrice}
                        </Text>
                        <Text style={styles.packageDescription}>
                          {item.packageDescription}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <Text style={styles.noPackagesText}>
                  No packages available for the selected event type.
                </Text>
              )}

              {/* Customize Your Own Package Button */}
              <TouchableOpacity
                onPress={() => {
                  setSelectedPackage(null); // Ensure no package is selected
                  setCurrentStep(3); // Proceed to customization
                }}
                style={styles.customizeButton}
              >
                <Text style={styles.customizeButtonText}>
                  Click here to Customize your event package
                </Text>
              </TouchableOpacity>

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <Button title="Back" onPress={handleBack} />
                <Button
                  title="Next"
                  onPress={() => {
                    setSelectedPackage(null); // Ensure no package is selected
                    setCurrentStep(4); // Proceed to customization
                  }}
                  disabled={!selectedPackage}
                />
              </View>
            </>
          )}
          {currentStep === 3 && (
            <>
              {/* Package Photo Section */}
              <TouchableOpacity
                onPress={handleCoverPhotoSelection}
                style={styles.coverPhotoContainer}
              >
                <Image
                  source={
                    coverPhoto
                      ? { uri: coverPhoto } // Show selected image
                      : selectimage // Default image
                  }
                  style={styles.coverPhoto}
                />
                <Text style={styles.addPhotoText}>Add Package Photo</Text>
              </TouchableOpacity>

              {/* Package Name */}
              <TextInput
                placeholder="Enter Package Name"
                value={packageName}
                onChangeText={setPackageName}
                style={styles.inputStyle}
              />

              {/* Package Event Type Dropdown */}
              <RNPickerSelect
                onValueChange={(value) => setPackageEventType(value)}
                placeholder={{
                  label: "Choose Package Event Type...",
                  value: null,
                }}
                items={[
                  { label: "Birthday", value: "Birthday" },
                  { label: "Wedding", value: "Wedding" },
                  { label: "Reunion", value: "Reunion" },
                  { label: "Conference", value: "Conference" },
                ]}
                style={pickerSelectStyles}
                value={packageEventType}
                useNativeAndroidPickerStyle={false}
              />

              {/* Service Categories and Services */}
              {["Food Catering", "Photography", "Videography"].map(
                (category) => (
                  <View key={category} style={styles.categoryContainer}>
                    <Text style={styles.categoryTitle}>{category}</Text>
                    {servicesList
                      .filter((service) => service.serviceCategory === category)
                      .map((service) => (
                        <TouchableOpacity
                          key={service.serviceId}
                          style={styles.serviceItem}
                          onPress={() =>
                            handleServiceToggle(
                              category,
                              service.serviceName,
                              service.basePrice
                            )
                          }
                        >
                          <View style={styles.checkbox}>
                            {selectedServices[category]?.includes(
                              service.serviceName
                            ) && <Text style={styles.checkboxText}>✔️</Text>}
                          </View>
                          <Text style={styles.serviceName}>
                            {service.serviceName} (${service.basePrice})
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                )
              )}

              {/* Display Total Price */}
              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceText}>
                  Total Price: ${totalPrice}
                </Text>
              </View>

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <Button title="Add Package" onPress={handleAddPackage} />
                <Button title="Close" onPress={onClose} color="#FF3B30" />
              </View>
            </>
          )}

          {currentStep === 4 && (
            <View>
              <Text style={styles.subTitle}>Add Guests</Text>
              <FlatList
                data={guests}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.guestContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Guest Name"
                      value={item.name}
                      onChangeText={(text) => updateGuest(index, "name", text)}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Guest Email"
                      value={item.email}
                      onChangeText={(text) => updateGuest(index, "email", text)}
                    />
                  </View>
                )}
              />
              <Button title="Add Guest" onPress={addGuest} />
              <Button
                title="Back"
                onPress={() => {
                  setCurrentStep(2);
                }}
              />
              <Button
                title="See packages"
                onPress={() => {
                  setCurrentStep(3);
                }}
              />
              <Button title="Book Event" onPress={handleAdd} />
            </View>
          )}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddEventOrPackageModalNew;
