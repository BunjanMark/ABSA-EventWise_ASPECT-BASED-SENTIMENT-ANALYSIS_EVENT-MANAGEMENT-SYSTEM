import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import {
  createEvent,
  fetchServices,
} from "../../../../services/organizer/adminEventServices";
import { useEffect } from "react";
import { useServicesStore } from "../../../../stateManagement/admin/useServicesStore";
import { testUploadImageToSupabase } from "../../../../services/organizer/testUploadSupabaseService/testUploadSupabaseService";

const CreateEventScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { services, setServices } = useServicesStore();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Event name is required"),
    date: Yup.date().required("Event date is required"),
    pax: Yup.number()
      .required("Number of pax is required")
      .positive("Number of pax must be positive"),
    venue: Yup.string().required("Venue is required"),
    type: Yup.string().required("Type is required"),
    coverPhoto: Yup.mixed()
      .nullable()
      .test("fileSize", "Cover photo must not exceed 16MB", (value) => {
        return value === null || (value && value.size <= 16384 * 1024);
      }),
  });

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
        const fileName = `event_cover_${Date.now()}.jpg`;
        console.log("Uploading image to server:", fileName);

        // Replace with your actual image upload logic
        coverPhotoURL = await testUploadImageToSupabase(
          values.coverPhoto,
          fileName
        );
        console.log("Image uploaded successfully. URL:", coverPhotoURL);
      }

      const newEvent = {
        name: values.name,
        date: values.date,
        pax: values.pax,
        venue: values.venue,
        type: values.type,
        cover_photo: coverPhotoURL || null,
      };

      console.log("New event data:", newEvent);
      const result = await createEvent(newEvent);

      Alert.alert("Success", "Event created successfully!");
      console.log("Server response:", result);
      resetForm();
    } catch (error) {
      console.error("Error creating event:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "An error occurred while creating the event. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        setImageUri(selectedUri);
      }
    } catch (error) {
      console.error("Error selecting cover photo:", error);
      Alert.alert(
        "Error",
        "An error occurred while selecting the cover photo."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: "",
          date: "",
          pax: "",
          venue: "",
          type: "",
          coverPhoto: null,
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
          <View style={styles.form}>
            <Button
              mode="contained"
              onPress={() => navigation.goBack()}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Button>
            <Text style={styles.title}>Create Event</Text>
            <View style={styles.coverPhotoContainer}>
              <TouchableOpacity onPress={handleImagePicker}>
                <Image
                  source={
                    imageUri
                      ? { uri: imageUri }
                      : require("../../../../../assets/selectimage.png")
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
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
            />
            {errors.name && touched.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Date"
              value={values.date}
              onChangeText={handleChange("date")}
              onBlur={handleBlur("date")}
            />
            {errors.date && touched.date && (
              <Text style={styles.errorText}>{errors.date}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Number of Pax"
              value={values.pax}
              onChangeText={handleChange("pax")}
              onBlur={handleBlur("pax")}
              keyboardType="numeric"
            />
            {errors.pax && touched.pax && (
              <Text style={styles.errorText}>{errors.pax}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Venue"
              value={values.venue}
              onChangeText={handleChange("venue")}
              onBlur={handleBlur("venue")}
            />
            {errors.venue && touched.venue && (
              <Text style={styles.errorText}>{errors.venue}</Text>
            )}
            <RNPickerSelect
              onValueChange={(value) => setFieldValue("type", value)}
              items={[
                { label: "Wedding", value: "Wedding" },
                { label: "Birthday", value: "Birthday" },
                { label: "Corporate Event", value: "Corporate Event" },
                { label: "Other", value: "Other" },
              ]}
              placeholder={{ label: "Select event type", value: null }}
            />
            {errors.type && touched.type && (
              <Text style={styles.errorText}>{errors.type}</Text>
            )}
            <View style={styles.createButtonContainer}>
              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={isLoading}
                disabled={isLoading}
                style={styles.createButton}
              >
                <Text style={styles.createButtonText}>Create Event</Text>
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "100%",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  input: {
    height: 40,
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCC",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginBottom: 10,
    flex: 1,
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  servicePhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  createButton: {
    backgroundColor: "#EEBA2B",
    padding: 1,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
    width: 200,
  },
  closeButton: {
    position: "absolute",
    backgroundColor: "transparent",
    top: 20,
    right: 20,
    width: 80,
    borderRadius: 100,
  },
  closeButtonText: {
    color: "red",
    fontSize: 16,
  },
  createButtonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CreateEventScreen;
