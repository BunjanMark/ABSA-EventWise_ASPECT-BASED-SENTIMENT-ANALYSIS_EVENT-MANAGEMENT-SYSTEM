import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Image,
  Platform,
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Modal from 'react-native-modal'; // If using react-native-modal
import { Button } from "react-native-paper";
import { FaTrashAlt } from 'react-icons/fa';
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import RNPickerSelect from "react-native-picker-select";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import selectimage from "../pictures/selectimage.png";
import { useServiceStore } from "../../../stateManagement/serviceProvider/useServiceStore";
import { fetchServices } from "../../../services/organizer/adminPackageServices";
import {
  createEvent,
  createPackage,
  fetchEvents,
} from "../../../services/organizer/adminEventServices";
import { testUploadImageToSupabase } from "../../../services/organizer/testUploadSupabaseService/testUploadSupabaseService";
import { fetchPackages } from "../../../services/organizer/adminPackageServices";
import DateTimePicker from "@react-native-community/datetimepicker";
import CalendarPicker from "react-native-calendar-picker";
import { fetchEventsByDate } from "../../../services/organizer/adminEventServices";
import Header from "../elements/Header";

const BookingProcess = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPackages, setCurrentPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [services, setServices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [time, setTime] = useState(new Date());
  const selectedPkg = currentPackages.find(pkg => pkg.id === selectedPackage);
  const openServiceModal = () => setModalVisible(true);
  const closeServiceModal = () => setModalVisible(false);
  const [confirmRemoveModalVisible, setConfirmRemoveModalVisible] = useState(false);
  const [selectedServiceToRemove, setSelectedServiceToRemove] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentScreen, setCurrentScreen] = useState(1);
  const [showTimePicker, setShowTimePicker] = useState(false);
  // Validation schema
  const validationSchema = Yup.object().shape({
    eventName: Yup.string().required("Event name is required"),
    eventType: Yup.string().required("Event type is required"),
    eventPax: Yup.number()
      .required("Event pax is required")
      .min(1, "Minimum 1 pax is required"),
    eventDate: Yup.date().required("Event date is required"),
    eventTime: Yup.string().required("Event time is required"),
    eventLocation: Yup.string().required("Event location is required"),
    description: Yup.string().required("Description is required"),
    currentPackages: Yup.array(),
    guests: Yup.array().of(
      Yup.object().shape({
        GuestName: Yup.string().required("Guest name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
      })
    ),
  });
  // Fetch packages on mount
  // console.log("setPackages function:" );

  // Fetch packages on mount
  useEffect(() => {
    const loadPackages = async () => {
      try {
        const fetchedPackages = await fetchPackages();
        setCurrentPackages(fetchedPackages); // Set the state
      } catch (error) {
        console.error("Error fetching packages:", error);
        Alert.alert("Error", "Unable to load packages. Please try again.");
      }
    };
    loadPackages();
  }, [setCurrentPackages]);


  useEffect(() => {
    const loadServices = async () => {
      try {
        const fetchedServices = await fetchServices();
        setServices(fetchedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
        Alert.alert("Error", "Unable to load services. Please try again.");
      }
    };
    loadServices();
  }, [setServices]);


  // CREATE EVENT FUNCTION
  const handleCreateEvent = async (values, resetForm) => {
    setIsLoading(true);
    try {
      let coverPhotoURL = null;
  
      // Check if the cover photo exists and upload it to Supabase if it does
      if (values.coverPhoto) {
        const fileName = `package_cover_${Date.now()}.jpg`;
        coverPhotoURL = await testUploadImageToSupabase(values.coverPhoto, fileName);
      }
  
      // Fetch existing events for the selected date
      const existingEvents = await fetchEventsByDate(values.eventDate);
      console.log("Event date " + values.eventDate + " events: ", existingEvents);
  
      // Check if the number of events for the selected date is less than 3
      if (existingEvents.length >= 3) {
        Alert.alert("Event Limit Reached", `You cannot create more than 3 events on ${values.eventDate}.`);
        return;
      }

      const formattedServices = selectedPkg.services.map(service => ({
        id: service.id,
        serviceName: service.serviceName,
        serviceCategory: service.serviceCategory,
        basePrice: service.basePrice,
        pax: service.pax,
        requirements: service.requirements,
      }));
      
      console.log("Formatted Services: ", formattedServices);  // Log the formatted data

      // Send the data to MySQL
      const packageData = {
        packageName: selectedPkg.packageName,
        eventType: selectedPkg.eventType,
        services: selectedPkg.services.map(service => service.id), // Avoid JSON.stringify if backend expects array
        totalPrice: values.eventPax * selectedPkg.totalPrice,
        packagePhotoURl: coverPhotoURL || "",
    };
    console.log("Package Data to send: ", packageData);

      // Create the package first
      const createdPackage = await createPackage(packageData);
      console.log("Created Package: ", createdPackage);

      // Ensure selectedPackage has a valid ID from the created package
      const newEvent = {
        eventName: values.eventName,
        eventType: values.eventType,
        eventPax: values.eventPax,
        eventStatus: "Tentative",              // Set event status as tentative initially
        packages: [createdPackage.id],        // Use the newly created package's ID
        eventDate: values.eventDate,
        eventTime: values.eventTime,
        eventLocation: values.eventLocation,
        description: values.description,
        guests: values.guests,
        coverPhoto: coverPhotoURL || null,
      };

      // Log the new event data for debugging
      console.log("New event data:", newEvent);

      // Create the event using the API
      const result = await createEvent(newEvent);
      console.log("Create event result:", result);

      // Notify user of success and reset the form
      Alert.alert("Success", "Event created successfully!");
      resetForm(); // TODO Fix this shit this back to its original
    } catch (error) {
      console.error("Error creating event:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "An error occurred while creating the event. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
};

  
  const [datesWithThreeOrMoreEvents, setDatesWithThreeOrMoreEvents] = useState(
    []
  );

  useEffect(() => {
    const fetchDatesWithThreeOrMoreEvents = async () => {
      try {
        const dates = await fetchEvents(); // fetch all events
        console.log("from fetchDatesWithThreeOrMoreEvents", dates);
        if (dates.length === 0) {
          console.log("No events found");
          return;
        }
        const datesWithThreeOrMoreEvents = dates.reduce((acc, event) => {
          const date = event.date;
          if (!acc.includes(date)) {
            const eventsOnDate = dates.filter((e) => e.date === date);
            if (eventsOnDate.length >= 3) {
              acc.push(date);
            }
          }
          return acc;
        }, []);
        setDatesWithThreeOrMoreEvents(datesWithThreeOrMoreEvents);
      } catch (error) {
        console.error("Error fetching dates with three or more events:", error);
      }
    };
    fetchDatesWithThreeOrMoreEvents();
  }, []);

  useEffect(() => {
    console.log("Dates with three or more events:", datesWithThreeOrMoreEvents);
  }, [datesWithThreeOrMoreEvents]);
  const renderItem = (item) => (
    <View style={styles.item}>
      <Text style={styles.selectedTextStyle}>{item.label}</Text>
      <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
    </View>
  );
  const handleImagePicker = async (setFieldValue) => {
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
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        const manipulatedResult = await ImageManipulator.manipulateAsync(
          selectedUri,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        let uri = manipulatedResult.uri;
        if (Platform.OS === "android" && !uri.startsWith("file://")) {
          uri = `file://${uri}`;
        }

        setFieldValue("coverPhoto", uri);
        setImageUri(uri);
        console.log("my image URI:", imageUri, "MY uri", uri);
      }
    } catch (error) {
      console.error("Error selecting cover photo:", error);
      Alert.alert(
        "Error",
        "An error occurred while selecting the cover photo."
      );
    }
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);


  return (
    <>
      <Header />
      <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Formik
             initialValues={{
            eventName: "",
            eventType: "",
            eventPax: "",
            currentPackages: [],
            eventDate: "",
            eventTime: "",
            eventLocation: "",
            description: "",
            coverPhoto: null,
            guests: [{ GuestName: "", email: "" }],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            handleCreateEvent(values, resetForm);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
            touched,
            }) => (
              <View style={[styles.form, { paddingBottom: 100 }]}>
                <Text style={styles.title}>Create Event</Text>

                {/* Event Creation Screen */}
                {currentScreen === 1 && (
                  <>
                  <View style={styles.servicePhotoContainer}>
                <TouchableOpacity
                  onPress={() => {
                    try {
                      handleImagePicker(setFieldValue);
                      console.log("Image URI:", imageUri);
                    } catch (error) {}
                  }}
                >
                  <Image
                    source={
                      values.coverPhoto
                        ? { uri: values.coverPhoto }
                        : selectimage
                    }
                    style={styles.servicePhoto}
                  />
                </TouchableOpacity>
                {touched.coverPhoto && errors.coverPhoto && (
                  <Text style={styles.errorText}>{errors.coverPhoto}</Text>
                )}
              </View>

                    <TextInput
                      style={styles.input}
                      placeholder="Event Name"
                      onChangeText={handleChange("eventName")}
                      onBlur={handleBlur("eventName")}
                      value={values.eventName}
                    />
                    {touched.eventName && errors.eventName && (
                      <Text style={styles.errorText}>{errors.eventName}</Text>
                    )}

                    <RNPickerSelect
                      onValueChange={(value) => setFieldValue("eventType", value)}
                      items={[
                        { label: "Wedding", value: "Wedding" },
                        { label: "Birthday", value: "Birthday" },
                        { label: "Corporate Event", value: "Corporate Event" },
                        { label: "Other", value: "Other" },
                      ]}
                      placeholder={{ label: "Select event type", value: null }}
                    />
                    {touched.eventType && errors.eventType && (
                      <Text style={styles.errorText}>{errors.eventType}</Text>
                    )}

                    <TextInput
                      style={styles.input}
                      placeholder="Event Pax"
                      keyboardType="numeric"
                      onChangeText={handleChange("eventPax")}
                      onBlur={handleBlur("eventPax")}
                      value={values.eventPax}
                    />
                    {touched.eventPax && errors.eventPax && (
                      <Text style={styles.errorText}>{errors.eventPax}</Text>
                    )}

                    <TouchableOpacity onPress={() => setShowCalendar(true)}>
                      <Text style={styles.datePicker}>
                        {selectedDate
                          ? `Selected Date: ${selectedDate.toISOString().split("T")[0]}`
                          : "Pick an Event Date"}
                      </Text>
                    </TouchableOpacity>
                    {showCalendar && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={showCalendar}
                onRequestClose={() => setShowCalendar(false)}
                style={styles.modalContainerCalendar}
              >
                {/* Background Overlay */}

                {/* Modal Content */}
                <View style={styles.modalContainer}>
                  <CalendarPicker
                    onDateChange={(date) => {
                      setShowCalendar(false);
                      setSelectedDate(date);
                      setFieldValue("eventDate", date.toISOString().split("T")[0]);
                    }}
                    disabledDates={datesWithThreeOrMoreEvents}
                    minDate={new Date()}
                    maxDate={
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth() + 6,
                        new Date().getDate()
                      )
                    }
                    selectedDate={selectedDate}
                  />
                  <Button
                    onPress={() => setShowCalendar(false)}
                    mode="contained"
                    style={styles.closeButton}
                  >
                    Close
                  </Button>
                </View>
              </Modal>
            )}


                    {touched.eventDate && errors.eventDate && (
                      <Text style={styles.errorText}>{errors.eventDate}</Text>
                    )}

                    <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                      <Text style={styles.datePicker}>
                        {values.eventTime ? values.eventTime : "Select Event Time"}
                      </Text>
                    </TouchableOpacity>
                    {showTimePicker && (
                      <DateTimePicker
                        value={time}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) => {
                          setShowTimePicker(false);
                          if (selectedTime) {
                            setTime(selectedTime);
                            const formattedTime = selectedTime.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            });
                            setFieldValue("eventTime", formattedTime);
                          }
                        }}
                      />
                    )}
                    {touched.eventTime && errors.eventTime && (
                      <Text style={styles.errorText}>{errors.eventTime}</Text>
                    )}

                    <TextInput
                      style={styles.input}
                      placeholder="Event Location"
                      onChangeText={handleChange("eventLocation")}
                      onBlur={handleBlur("eventLocation")}
                      value={values.eventLocation}
                    />
                    {touched.eventLocation && errors.eventLocation && (
                      <Text style={styles.errorText}>{errors.eventLocation}</Text>
                    )}

                    <TextInput
                      style={styles.input}
                      placeholder="Description"
                      multiline
                      onChangeText={handleChange("description")}
                      onBlur={handleBlur("description")}
                      value={values.description}
                    />
                    {touched.description && errors.description && (
                      <Text style={styles.errorText}>{errors.description}</Text>
                    )}

               

                    <Button
                      mode="contained"
                      onPress={() => setCurrentScreen(2)} // Switch to Packages screen
                    >
                      Next
                    </Button>
                  </>
                )}

                {/* Packages Screen */}
                {currentScreen === 2 && (
  <>
    <Text style={styles.title}>Available Packages</Text>

    {currentPackages && currentPackages.length > 0 ? (
  <ScrollView>
    {currentPackages.map((pkg, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.packageCard,
          selectedPackage === pkg.id && styles.selectedPackageCard, // Compare with pkg.id
        ]}
        onPress={() => {
          console.log("Package clicked:", pkg.id); // Log the clicked package's ID
          setSelectedPackage(pkg.id); // Update the selected package
        }}
      >
        <Text style={styles.packageName}>Id: {pkg.id}</Text>
        <Text style={styles.packageName}>Name: {pkg.packageName}</Text>
        <Text style={styles.packageType}>Type: {pkg.eventType}</Text>
        <Text style={styles.packagePrice}>Price: ${pkg.totalPrice}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
) : (
  <Text style={styles.noPackagesText}>No packages available at the moment.</Text>
)}


    <Button mode="contained" onPress={() => setCurrentScreen(1)}>
      Back
    </Button>
    <Button
  mode="contained"
  onPress={() => {
    setCurrentScreen(3);
    console.log("Proceeding with package ID:", selectedPackage);
    
    const selectedPkgDetails = currentPackages.find(pkg => pkg.id === selectedPackage);
    if (selectedPkgDetails) {
      console.log("Proceeding with package details:");
      console.log("ID:", selectedPkgDetails.id);
      console.log("packageName:", selectedPkgDetails.packageName);
      console.log("eventType:", selectedPkgDetails.eventType);
      console.log("totalPrice:", selectedPkgDetails.totalPrice);
    } else {
      console.log("No package selected or package details not found.");
    }
  }}
>
  Next
</Button>

  </>
)}


{currentScreen === 3 && selectedPackage !== null && (
  <>
    {/* Display the selected package details */}
    <Text style={styles.title}>Selected Package</Text>
    
    <View style={styles.packageDetails}>
      {selectedPkg ? (
        <>
          {/* Package Info */}
          <Text style={styles.packageName}>Name: {selectedPkg.packageName}</Text>
          <Text style={styles.packageType}>Type: {selectedPkg.eventType}</Text>
          <Text style={styles.packagePrice}>Price: ${selectedPkg.totalPrice}</Text>

          {/* Log selected package details */}
          {console.log("Selected Package Details:", {
            id: selectedPkg.id,
            name: selectedPkg.packageName,
            type: selectedPkg.eventType,
            price: selectedPkg.totalPrice,
            services: selectedPkg.services
          })}

          {/* Services for the package */}
          <Text style={styles.serviceInclusions}>Service Inclusions</Text>
          
          {selectedPkg.services && selectedPkg.services.length > 0 ? (
            selectedPkg.services.map((service, index) => (
              <View key={index} style={styles.serviceContainer}>
                <Text style={styles.serviceName}>Service Id: {service.id}</Text>
                <Text style={styles.serviceName}>Service Name: {service.serviceName}</Text>
                <Text style={styles.serviceCategory}>Category: {service.serviceCategory}</Text>
                <Text style={styles.serviceFeature}>Feature: {service.serviceFeatures}</Text>

                {/* Log each service */}
                {console.log("Service Details:", {
                  serviceId: service.id,
                  serviceName: service.serviceName,
                  category: service.serviceCategory,
                  feature: service.serviceFeatures
                })}

                {/* Remove Service Button */}
                <TouchableOpacity
                  onPress={() => {
                    setSelectedServiceToRemove(service);
                    setConfirmRemoveModalVisible(true);
                  }}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noServicesText}>No services available for this package.</Text>
          )}
        </>
      ) : (
        <Text>Package not found.</Text>
      )}
    </View>

    {/* Add Service Button */}
    <Button mode="contained" onPress={openServiceModal}>
      Add Service
    </Button>

    {/* Log service addition */}
    {modalVisible && (
      <Modal
        isVisible={modalVisible}
        onBackdropPress={closeServiceModal}
        onBackButtonPress={closeServiceModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select a Service</Text>

          {/* Search Bar */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Category..."
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)} // Update search query as user types
          />

          {/* Filtered List of Services */}
          {services && services.length > 0 ? (
            <ScrollView>
              {services
                .filter(service =>
                  service.serviceCategory.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((service, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.serviceItem}
                    onPress={() => {
                      // Ensure the selectedPkg is updated correctly without mutating the original object
                      const updatedServices = selectedPkg
                        ? [...selectedPkg.services, service]
                        : [service];

                      // Clone the currentPackages and update the selected package with new services
                      const updatedPackages = currentPackages.map(pkg =>
                        pkg.id === selectedPkg.id ? { ...pkg, services: updatedServices } : pkg
                      );

                      // Log the updated package details after adding a service
                      console.log("Package updated with new service:", {
                        packageId: selectedPkg.id,
                        updatedServices: updatedServices
                      });

                      // Set the updated packages list
                      setCurrentPackages(updatedPackages);
                      closeServiceModal(); // Close the modal after selection
                    }}
                  >
                    <Text style={styles.serviceName}>{service.serviceName}</Text>
                    <Text style={styles.serviceCategory}>{service.serviceCategory}</Text>
                    <Text style={styles.servicePrice}>Price: ${service.basePrice}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          ) : (
            <Text>No services available.</Text>
          )}

          {/* Close Button */}
          <Button mode="contained" onPress={closeServiceModal}>
            Close
          </Button>
        </View>
      </Modal>
    )}

    {/* Remove Service Confirmation Modal */}
    {confirmRemoveModalVisible && (
      <Modal
        isVisible={confirmRemoveModalVisible}
        onBackdropPress={() => setConfirmRemoveModalVisible(false)}
        onBackButtonPress={() => setConfirmRemoveModalVisible(false)}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={styles.modalContainerConfirm}>
          <Text style={styles.modalTitle}>Are you sure you want to remove this service?</Text>
          <Text style={styles.serviceName}>{selectedServiceToRemove?.serviceName}</Text>

          <View style={styles.modalActions}>
            <Button
              mode="contained"
              onPress={() => {
                // Ensure you're filtering by ID or another unique identifier for object comparison
                const updatedServices = selectedPkg.services.filter(
                  service => service.id !== selectedServiceToRemove.id
                );

                // Log the updated service list after removal
                console.log("Package updated after service removal:", {
                  packageId: selectedPkg.id,
                  updatedServices: updatedServices
                });

                // Clone the currentPackages and update the selected package
                const updatedPackages = currentPackages.map(pkg =>
                  pkg.id === selectedPkg.id ? { ...pkg, services: updatedServices } : pkg
                );

                // Update the state with the new package list
                setCurrentPackages(updatedPackages);
                
                // Close the modal after the update
                setConfirmRemoveModalVisible(false);
              }}
            >
              Yes, Remove
            </Button>
            
            <Button
              mode="contained"
              onPress={() => setConfirmRemoveModalVisible(false)} // Cancel action
            >
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    )}

    {/* Navigation Buttons */}
    <Button mode="contained" onPress={() => setCurrentScreen(2)}>
      Back
    </Button>
    <Button mode="contained" onPress={() => setCurrentScreen(4)}>
      Next
    </Button>
  </>
)}


                {/* Guests Screen */}
                {currentScreen === 4 && (
  <>
    <FieldArray name="guests">
      {({ remove, push }) => (
        <View>
          {values.guests.map((guest, index) => (
            <View key={index} style={styles.guestContainer}>
              <TextInput
                style={styles.input}
                placeholder="Guest Name"
                value={guest.GuestName}
                onChangeText={handleChange(`guests[${index}].GuestName`)} // Corrected template string
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={guest.email}
                onChangeText={handleChange(`guests[${index}].email`)} // Corrected template string
              />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={guest.phone}
                onChangeText={handleChange(`guests[${index}].phone`)} // Corrected template string
              />
              <TouchableOpacity onPress={() => remove(index)}>
                <Text style={styles.removeGuest}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Button
            onPress={() => push({ GuestName: "", email: "", phone: "" })} // Adds new guest
          >
            Add Guest
          </Button>
        </View>
      )}
    </FieldArray>
    <Button
                mode="contained"
                onPress={handleSubmit}
                loading={isLoading}
                disabled={isLoading}
                style={styles.createButton}
              >
                Submit
              </Button>
              <Button mode="contained" onPress={() => setCurrentScreen(2)}>
        Back
      </Button>
  </>
)}

              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  selectedDateText: {
    marginTop: 20,
    fontSize: 18,
    color: "black",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  modalContainer: {
    backgroundColor: 'white', // White background for the modal
    borderRadius: 10, // Optional: adds rounded corners
    padding: 20, // Padding inside the modal
    maxWidth: '80%', // Restricts the width to 80% of the screen width
    maxHeight: '80%', // Restricts the height to 80% of the screen height
    alignSelf: 'center', // Centers the modal horizontally
    justifyContent: 'center', // Centers the content vertically
    elevation: 10, // Adds shadow on Android
    shadowColor: '#000', // Shadow color on iOS
    shadowOpacity: 0.1, // Shadow opacity on iOS
    shadowRadius: 5, // Shadow radius on iOS
    position: 'absolute', // Make sure it's on top of the screen
    top: '10%',          // Adjust the top and bottom position if necessary
    left: '10%',         // Center horizontally
    right: '10%',
    bottom: '10%',       
    zIndex: 9999, // Ensure the modal is always on top of other content
  },
  modalContainerConfirm: {
    backgroundColor: 'white', // White background for the modal
    borderRadius: 10, // Optional: adds rounded corners
    padding: 20, // Padding inside the modal
    maxHeight: '20%', // Restricts the height to 80% of the screen height
    justifyContent: 'center', // Centers the content vertically
    elevation: 10, // Adds shadow on Android
    shadowColor: '#000', // Shadow color on iOS
    shadowOpacity: 0.1, // Shadow opacity on iOS
    shadowRadius: 5, // Shadow radius on iOS
    position: 'absolute', // Make sure it's on top of the screen
    top: '40%',          // Adjust the top and bottom position if necessary
    left: '10%',         // Center horizontally
    right: '10%',
    bottom: '10%',       
    zIndex: 9999, // Ensure the modal is always on top of other content
  },

  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
    position: 'absolute', // Backdrop should cover the entire screen
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999, // Ensure it's behind the modal content but in front of the background
  },
  modalContainer: {
    backgroundColor: 'white', // White background for the modal
    borderRadius: 10, // Optional: adds rounded corners
    padding: 20, // Padding inside the modal
    maxHeight: '50%',
    width:'100%', // Restricts the height to 50% of the screen height
    position: 'absolute', // Absolute positioning to center the modal
    top: '25%', // Centers vertically (25% from the top of the screen)
    left: '0', // Centers horizontally (10% from the left of the screen)
    zIndex: 999, // Makes sure the modal is above other content
  },

  
  calendarContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  form: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    textAlign: "center",
    color: "#888",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  guestContainer: {
    marginBottom: 16,
  },
  removeGuest: {
    color: "red",
    textAlign: "right",
  },
  submitButton: {
    marginTop: 16,
  },
  servicePhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },

  packageCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  selectedPackageCard: {
    borderColor: "#007BFF", // Highlight color for selected package
    borderWidth: 2,
  },
  packageName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  packageType: {
    fontSize: 14,
    color: "#666",
  },
  packagePrice: {
    fontSize: 14,
    color: "#333",
  },
  noPackagesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
  serviceInclusions: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  serviceCard: {
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 14,
  },
  servicePrice: {
    fontSize: 12,
  },
  serviceCategory: {
    fontSize: 12,
    color: 'gray',
  },
  serviceFeature: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  noServicesText: {
    fontSize: 14,
    color: 'gray',
  },
  serviceContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    position: 'relative',  // For positioning the remove button
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent', // No background color
    padding: 5,
  },
  
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  trashIcon: {
    fontSize: 20,
    color: 'red',
  },
  title: { fontSize: 24 },
  packageDetails: { marginBottom: 20 },
  serviceContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    position: 'relative',
  },

  confirmRemoveModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
 searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    marginTop: 10,
  },

});

export default BookingProcess;