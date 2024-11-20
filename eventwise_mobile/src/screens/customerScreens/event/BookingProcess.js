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
  Modal,
} from "react-native";
import { Button } from "react-native-paper";
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
  const { services, setServices } = useServiceStore();
  const [activeScreen, setActiveScreen] = useState("details");
  const [time, setTime] = useState(new Date());

  const handleNext = () => {
    if (activeScreen === "details") {
      setActiveScreen("packages");
    } else if (activeScreen === "packages") {
      setActiveScreen("guests");
    }
  };

  const handlePrevious = () => {
    if (activeScreen === "guests") {
      setActiveScreen("packages");
    } else if (activeScreen === "packages") {
      setActiveScreen("details");
    }
  };
  const [currentScreen, setCurrentScreen] = useState(1);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selected, setSelected] = useState([]);
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
        // console.log(
        //   "Fetched packages (eventAdmin): ",
        //   JSON.stringify(fetchedPackages, null, 2)
        // );
        setCurrentPackages(fetchedPackages); // Set the state
      } catch (error) {
        console.error("Error fetching packages:", error);
        Alert.alert("Error", "Unable to load packages. Please try again.");
      }
    };
    loadPackages();
  }, [setCurrentPackages]);
  // console.log("fetched packages: " + JSON.stringify(currentPackages, null, 2));
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

  const handleCreateEvent = async (values, resetForm) => {
    setIsLoading(true);
    try {
      let coverPhotoURL = null;

      if (values.coverPhoto) {
        const fileName = `package_cover_${Date.now()}.jpg`;
        coverPhotoURL = await testUploadImageToSupabase(
          values.coverPhoto,
          fileName
        );
      }
      // Fetch existing events for the selected date
      const existingEvents = await fetchEventsByDate(values.eventDate);
      console.log(
        "event date" + values.eventDate + " events: " + existingEvents
      );
      // Check if the number of events for the selected date is less than 3
      if (existingEvents.length >= 3) {
        Alert.alert(
          "Event Limit Reached",
          `You cannot create more than 3 events on ${values.eventDate}.`
        );
        return;
      }
      const newEvent = {
        eventName: values.eventName,
        eventType: values.eventType,
        eventPax: values.eventPax,
        eventStatus: "Tenative",
        packages: selected,
        eventDate: values.eventDate,
        eventTime: values.eventTime,
        eventLocation: values.eventLocation,
        description: values.description,
        guests: values.guests,
        coverPhoto: coverPhotoURL || null,
      };


      console.log("New event data: ================", newEvent);
      const result = await createEvent(newEvent);

      Alert.alert("Success", "Event created successfully!");
      resetForm();
    } catch (error) {
      console.error("Error creating events:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "An error occurred while creating the event. Please try again."
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
                        style={styles.modalContainer}
                      >
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
                    <MultiSelect
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={currentPackages
                        .filter((currentPackage) => currentPackage.packageName && currentPackage.id)
                        .map((currentPackage) => ({
                          label: currentPackage.packageName,
                          value: currentPackage.id,
                          category: currentPackage.eventType,
                        }))}
                      labelField="label"
                      valueField="value"
                      placeholder="Select currentPackages"
                      value={selected}
                      search
                      searchPlaceholder="Search..."
                      onChange={(items) => {
                        setSelected(items);
                        setFieldValue(
                          "currentPackages",
                          items.map((item) => item.value) // Update Formik with selected package values
                        );
                      }}
                      renderItem={renderItem}
                      renderLeftIcon={() => (
                        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                      )}
                      renderSelectedItem={(item, unSelect) => (
                        <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                          <View style={styles.selectedStyle}>
                            <Text style={styles.textSelectedStyle}>{item.label}</Text>
                            <AntDesign color="black" name="delete" size={17} />
                          </View>
                        </TouchableOpacity>
                      )}
                    />

                    <Button
                      mode="contained"
                      onPress={() => setCurrentScreen(3)} // Switch to Guests screen
                    >
                      Next
                    </Button>
                  </>
                )}

                {/* Guests Screen */}
                {currentScreen === 3 && (
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    top: 200,
    height: "50%",
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
});

export default BookingProcess;