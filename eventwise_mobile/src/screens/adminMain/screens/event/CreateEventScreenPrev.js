import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createEvent } from "../../../../services/organizer/adminEventServices";
const CreateEventScreenPrev = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    // coverPhoto: Yup.string()
    //   .url("Must be a valid URL")
    //   .required("Cover photo URL is required"),
    guests: Yup.array().of(
      Yup.object().shape({
        GuestName: Yup.string().required("Guest name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
      })
    ),
  });

  // const handleCreateEvent = async (values, { resetForm }) => {
  //   console.log("Form Values:", values);
  //   setIsLoading(true);
  //   try {
  //     const newEvent = {
  //       eventname: values.eventName, // Correct field name
  //       eventType: values.eventType,
  //       eventPax: values.eventPax,
  //       eventDate: values.eventDate,
  //       eventTime: values.eventTime,
  //       eventLocation: values.eventLocation,
  //       description: values.description,
  //       guests: values.guests,
  //     };

  //     console.log("New event data:", newEvent);
  //     const result = await createEvent(newEvent);
  //     Alert.alert("Success", "Event created successfully!");
  //     console.log("Server response:", result);
  //     resetForm(); // Reset form after success
  //     navigation.goBack(); // Navigate back after event creation
  //   } catch (error) {
  //     console.error("Error creating event:", error);
  //     Alert.alert(
  //       "Error",
  //       error?.message || "An error occurred while creating the event."
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleCreateEvent = async (values, resetForm) => {
    setIsLoading(true);
    try {
      let coverPhotoURL = null;

      if (values.coverPhoto) {
        const fileName = `package_cover_${Date.now()}.jpg`;
        console.log("Uploading image to server:", fileName);

        // Replace with your actual image upload logic
        coverPhotoURL = await testUploadImageToSupabase(
          values.coverPhoto,
          fileName
        );
        console.log("Image uploaded successfully. URL:", coverPhotoURL);
      }

      const newEvent = {
        eventname: values.eventName, // Correct field name
        eventType: values.eventType,
        eventPax: values.eventPax,
        eventDate: values.eventDate,
        eventTime: values.eventTime,
        eventLocation: values.eventLocation,
        description: values.description,
        guests: values.guests,
      };

      console.log("New package data:", newEvent);
      const result = await createPackage(newEvent);

      Alert.alert("Success", "Package created successfully!");
      console.log("Server response:", result);
      resetForm();
    } catch (error) {
      console.error("Error creating package:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "An error occurred while creating the package. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={[styles.container, { paddingBottom: 100 }]}>
      <ScrollView style={[{ width: "100%" }]}>
        <Formik
          initialValues={{
            eventName: "",
            eventType: "",
            eventPax: "",
            eventDate: "",
            eventTime: "",
            eventLocation: "",
            description: "",
            coverPhoto: "",
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
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              <Text style={styles.title}>Create Event</Text>
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

              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.datePicker}>
                  {values.eventDate ? values.eventDate : "Select Event Date"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setDate(selectedDate);
                      setFieldValue(
                        "eventDate",
                        selectedDate.toISOString().split("T")[0]
                      );
                    }
                  }}
                />
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
                      const formattedTime = selectedTime.toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      );
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

              <TextInput
                style={styles.input}
                placeholder="Cover Photo URL"
                onChangeText={handleChange("coverPhoto")}
                onBlur={handleBlur("coverPhoto")}
                value={values.coverPhoto}
              />
              {touched.coverPhoto && errors.coverPhoto && (
                <Text style={styles.errorText}>{errors.coverPhoto}</Text>
              )}

              <FieldArray name="guests">
                {({ remove, push }) => (
                  <View>
                    {values.guests.map((guest, index) => (
                      <View key={index} style={styles.guestContainer}>
                        <TextInput
                          style={styles.input}
                          placeholder="Guest Name"
                          value={guest.GuestName}
                          onChangeText={handleChange(
                            `guests.${index}.GuestName`
                          )} // Dynamically updating guest fields
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Email"
                          value={guest.email}
                          onChangeText={handleChange(`guests.${index}.email`)} // Dynamically updating guest fields
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Phone"
                          value={guest.phone}
                          onChangeText={handleChange(`guests.${index}.phone`)} // Dynamically updating guest fields
                        />
                        <TouchableOpacity onPress={() => remove(index)}>
                          <Text style={styles.removeGuest}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                    <Button
                      onPress={() =>
                        push({ GuestName: "", email: "", phone: "" })
                      }
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
                Create Eventsss
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default CreateEventScreenPrev;
