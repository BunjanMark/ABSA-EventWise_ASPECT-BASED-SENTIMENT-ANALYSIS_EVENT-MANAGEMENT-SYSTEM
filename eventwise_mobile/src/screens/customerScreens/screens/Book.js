import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";
import Header from "../elements/Header";

const Book = () => {
  const [eventType, setEventType] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [invitationMessage, setInvitationMessage] = useState("");
  const [peopleToInvite, setPeopleToInvite] = useState("");
  const [guests, setGuests] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedVenueLocation, setSelectedVenueLocation] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };

  useEffect(() => {
    if (route.params) {
      const { selectedVenueLocation, selectedPackage, totalPrice } =
        route.params;
      if (selectedVenueLocation)
        setSelectedVenueLocation(selectedVenueLocation);
      if (selectedPackage) setSelectedPackage(selectedPackage);
      if (totalPrice) setTotalPrice(totalPrice);
    }
  }, [route.params]);

  const saveEvent = async () => {
    if (
      !eventName ||
      !eventType ||
      !selectedDate ||
      !description ||
      !selectedVenueLocation ||
      !invitationMessage ||
      !peopleToInvite ||
      !selectedPackage
    ) {
      Alert.alert("Missing Fields", "Please fill out all required fields.");
      return;
    }

    const bookedEvent = {
      eventType,
      eventName,
      eventDate: selectedDate,
      eventLocation: selectedVenueLocation,
      description,
      invitationMessage,
      guests: parseGuests(peopleToInvite),
      package: selectedPackage,
    };

    try {
      const key = `@booked_events:${Date.now()}`;
      await AsyncStorage.setItem(key, JSON.stringify(bookedEvent));
      showToast("Event booked successfully!");
      clearForm();
      navigation.navigate("EventDetails", { event: bookedEvent });
      navigation.navigate("Guest", { event: bookedEvent });
    } catch (e) {
      console.error("Error saving event:", e);
      showToast("Failed to save event.");
    }
  };

  const clearForm = () => {
    setEventType("");
    setSelectedDate(null);
    setEventName("");
    setDescription("");
    setSelectedVenueLocation(null);
    setInvitationMessage("");
    setPeopleToInvite("");
    setSelectedPackage(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.dateString);
    setIsCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const navigateToVenue = () => {
    navigation.navigate("Venue", {
      setVenueLocation: (venueLocation) => {
        setSelectedVenueLocation(venueLocation);
      },
    });
  };

  const parseGuests = (input) => {
    return input.split(",").map((guest, index) => {
      const [name, email] = guest.trim().split(" and ");
      return { id: index + 1, name, email };
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require("../pictures/bg.png")}>
        <Header />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Book Event</Text>
            </View>
            <Text style={styles.headerEType}>Choose Event Type</Text>
            <View style={styles.eventTypeContainer}>
              <ScrollView
                horizontal
                contentContainerStyle={styles.eventTypeButtonContainer}
              >
                <TouchableOpacity
                  style={[
                    styles.eventTypeButton,
                    eventType === "Wedding" && styles.selectedEventTypeButton,
                  ]}
                  onPress={() => setEventType("Wedding")}
                >
                  <Text style={styles.eventTypeText}>Wedding</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.eventTypeButton,
                    eventType === "Birthday" && styles.selectedEventTypeButton,
                  ]}
                  onPress={() => setEventType("Birthday")}
                >
                  <Text style={styles.eventTypeText}>Birthday</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.eventTypeButton,
                    eventType === "Reunion" && styles.selectedEventTypeButton,
                  ]}
                  onPress={() => setEventType("Reunion")}
                >
                  <Text style={styles.eventTypeText}>Reunion</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.eventTypeButton,
                    eventType === "Debut" && styles.selectedEventTypeButton,
                  ]}
                  onPress={() => setEventType("Debut")}
                >
                  <Text style={styles.eventTypeText}>Debut</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.eventTypeButton,
                    eventType === "KidsParty" && styles.selectedEventTypeButton,
                  ]}
                  onPress={() => setEventType("KidsParty")}
                >
                  <Text style={styles.eventTypeText}>Kid's Party</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.eventTypeButton,
                    eventType === "Valentines" &&
                      styles.selectedEventTypeButton,
                  ]}
                  onPress={() => setEventType("Valentines")}
                >
                  <Text style={styles.eventTypeText}>Valentines</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.eventTypeButton,
                    eventType === "Christmas" && styles.selectedEventTypeButton,
                  ]}
                  onPress={() => setEventType("Christmas")}
                >
                  <Text style={styles.eventTypeText}>Christmas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.eventTypeButton,
                    eventType === "Alumni" && styles.selectedEventTypeButton,
                  ]}
                  onPress={() => setEventType("Alumni")}
                >
                  <Text style={styles.eventTypeText}>Alumni</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.eventTypeButton,
                    eventType === "Party" && styles.selectedEventTypeButton,
                  ]}
                  onPress={() => setEventType("Party")}
                >
                  <Text style={styles.eventTypeText}>Party</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                placeholder="Type event name (e.g. Mr. & Mrs. Malik Wedding)"
                value={eventName}
                onChangeText={setEventName}
              />
            </View>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                placeholder="Type your event description..."
                multiline
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <View style={styles.formGroup}>
              <TouchableOpacity
                style={styles.calendarButton}
                onPress={toggleCalendar}
              >
                <Text style={styles.calendarButtonText}>
                  Choose your event date{" "}
                </Text>
                <Icon name="calendar" size={16} color="#fff" />
              </TouchableOpacity>
              {isCalendarVisible && (
                <View style={styles.calendarContainer}>
                  <Calendar
                    onDayPress={handleDateChange}
                    markedDates={{
                      [selectedDate]: {
                        selected: true,
                        marked: true,
                        selectedColor: "#e6b800",
                      },
                    }}
                    theme={{
                      backgroundColor: "#23232e",
                      calendarBackground: "#23232e",
                      textSectionTitleColor: "#cdb6c1",
                      selectedDayBackgroundColor: "#e6b800",
                      selectedDayTextColor: "#23232e",
                      todayTextColor: "#e6b800",
                      dayTextColor: "#fff",
                      textDisabledColor: "#424242",
                      dotColor: "#e6b800",
                      selectedDotColor: "#23232e",
                      arrowColor: "#e6b800",
                      monthTextColor: "#fff",
                      textDayHeaderFontColor: "#fff",
                    }}
                  />
                </View>
              )}
              <View style={styles.selectedItemsContainer}>
                {selectedDate ? (
                  <>
                    {selectedDate && (
                      <Text style={styles.selectedText}>
                        Selected Date: {selectedDate}
                      </Text>
                    )}
                  </>
                ) : (
                  <Text style={styles.placeholderText}>
                    Selected date will be displayed here
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                placeholder="Invitation Message"
                multiline
                value={invitationMessage}
                onChangeText={setInvitationMessage}
              />
            </View>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                placeholder="People to invite (Name and Email, separated by comma)"
                value={peopleToInvite}
                onChangeText={setPeopleToInvite}
              />
            </View>
            <View style={styles.formButton}>
              <TouchableOpacity
                style={styles.navigateButton}
                onPress={() => navigation.navigate("Package")}
              >
                <Text style={styles.navigateButtonText}>
                  Find packages, choose and/or customize
                </Text>
              </TouchableOpacity>
              <View style={styles.selectedItemsContainer}>
                <Text style={styles.selectedText}>Package</Text>
                {/* CUSTOMIZE PACKAGE */}
                {Array.isArray(selectedPackage) ? (
                  selectedPackage.map((pkg, index) => (
                    <View key={index} style={styles.serviceItem}>
                      <Image source={pkg.image} style={styles.serviceImage} />
                      <View style={styles.serviceS}>
                        <Text style={styles.serviceName}>{pkg.name}</Text>
                        <Text style={styles.serviceType}>{pkg.type}</Text>
                        <Text style={styles.servicePrice}>{pkg.price}k</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  // PACKAGE (NOT CUSTOMIZE)
                  <View style={styles.packageContainer}>
                    <Image
                      source={selectedPackage}
                      style={styles.selectedImage}
                    />
                  </View>
                )}
                {Array.isArray(selectedPackage) && (
                  <View>
                    <Text style={styles.selectedText}>
                      Total Price: {totalPrice}k
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.formButton}>
              <TouchableOpacity
                style={styles.navigateButton}
                onPress={navigateToVenue}
              >
                <Text style={styles.navigateButtonText}>
                  Find venue and choose
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.selectedItemsContainer}>
              <Text style={styles.selectedText}>Venue</Text>
              {selectedVenueLocation && (
                <Text style={styles.selectedVenue}>
                  {selectedVenueLocation}
                </Text>
              )}
            </View>

            <TouchableOpacity style={styles.bookButton} onPress={saveEvent}>
              <Text style={styles.bookButtonText}>Book Event</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
    marginTop: 8,
  },
  headerText: {
    color: "#e6b800",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerEType: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5,
  },
  eventTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginLeft: -8,
  },
  eventTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e6b800",
    marginHorizontal: 3,
  },
  eventTypeButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  selectedEventTypeButton: {
    backgroundColor: "#e6b800",
  },
  eventTypeText: {
    color: "#fff",
    fontSize: 16,
  },
  formGroup: {
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 12,
  },
  calendarButton: {
    backgroundColor: "#C2B067",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 2,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calendarButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  selectedItemsContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",
  },
  selectedText: {
    color: "black",
    fontSize: 16,
    marginBottom: 10,
  },
  selectedVenue: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  placeholderText: {
    color: "gray",
    fontSize: 16,
    fontStyle: "italic",
  },
  formButton: {
    marginBottom: 5,
    marginTop: 15,
  },
  navigateButton: {
    backgroundColor: "#C2B067",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  navigateButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: "#e6b800",
    alignItems: "center",
    marginBottom: 300,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 20,
    margin: 100,
    marginTop: 40,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  packageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  selectedImage: {
    resizeMode: "cover",
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  serviceS: {
    flexDirection: "column",
    alignItems: "flex-start",
    alignContent: "space-between",
  },
  serviceImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
  },
  serviceName: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
  serviceType: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  servicePrice: {
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
  },
  noSelection: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  venueContainer: {
    marginTop: 20,
  },
  venueHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  venueImage: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
});

export default Book;
