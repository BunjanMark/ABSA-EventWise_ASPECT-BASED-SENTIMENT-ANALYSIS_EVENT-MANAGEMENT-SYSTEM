import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ImageBackground, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-root-toast";
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import Header from "../elements/Header";

const { width, height } = Dimensions.get('window');

const Book = () => {
  const [eventType, setEventType] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [invitationMessage, setInvitationMessage] = useState('');
  const [peopleToInvite, setPeopleToInvite] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedVenueLocation, setSelectedVenueLocation] = useState(null);

  useEffect(() => {
    if (route.params) {
      const { selectedPackage: pkgFromRoute, selectedVenueLocation: venueFromRoute } = route.params;
      if (pkgFromRoute) setSelectedPackage(pkgFromRoute);
      if (venueFromRoute) setSelectedVenueLocation(venueFromRoute);
    }
  }, [route.params]);

  const saveEvent = async () => {
    if (!eventName || !eventType || !selectedDate || !description || !selectedVenueLocation || !invitationMessage || !peopleToInvite || !selectedPackage) {
      showToast('Please fill in all the details.');
      return;
    }

    const bookedEvent = {
      eventType,
      eventName,
      eventDate: selectedDate,
      eventLocation: selectedVenueLocation,
      description,
      invitationMessage,
      peopleToInvite,
      package: selectedPackage,
    };

    try {
      const key = `@booked_events:${Date.now()}`;
      await AsyncStorage.setItem(key, JSON.stringify(bookedEvent));
      showToast('Event booked successfully!');
      clearForm(); 
    } catch (e) {
      console.error('Error saving event:', e);
      showToast('Failed to save event.');
    }
  };

  const clearForm = () => {
    setEventType('');
    setSelectedDate(null);
    setEventName('');
    setDescription('');
    setSelectedVenueLocation(null);
    setInvitationMessage('');
    setPeopleToInvite('');
    setSelectedPackage(null);
  };

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.dateString);
    setIsCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const navigateToVenue = () => {
    navigation.navigate('Venue', {
      setVenueLocation: (venueLocation) => {
        setSelectedVenueLocation(venueLocation);
      },
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../pictures/bg.png")} style={styles.backgroundImage}>
        <Header />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Book Event</Text>
            </View>
            <Text style={styles.headerEType}>Choose Event Type</Text>
            <View style={styles.eventTypeContainer}>
              <ScrollView horizontal contentContainerStyle={styles.eventTypeButtonContainer}>
                {['Wedding', 'Birthday', 'Reunion', 'Debut', "Kid's Party", 'Valentines', 'Christmas', 'Alumni', 'Party'].map((type) => (
                  <TouchableOpacity key={type} style={[styles.eventTypeButton, eventType === type && styles.selectedEventTypeButton]} onPress={() => setEventType(type)}>
                    <Text style={styles.eventTypeText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.formGroup}>
              <TextInput style={styles.input} placeholder="Type event name (e.g. Mr. & Mrs. Malik Wedding)" value={eventName} onChangeText={setEventName} />
            </View>
            <View style={styles.formGroup}>
              <TextInput style={styles.input} placeholder="Type your event description..." multiline value={description} onChangeText={setDescription} />
            </View>
            <View style={styles.formGroup}>
              <TouchableOpacity style={styles.calendarButton} onPress={toggleCalendar}>
                <Text style={styles.calendarButtonText}>Choose your event date </Text>
                <Icon name="calendar" size={16} color="#fff" />
              </TouchableOpacity>
              {isCalendarVisible && (
                <View style={styles.calendarContainer}>
                  <Calendar
                    onDayPress={handleDateChange}
                    markedDates={{
                      [selectedDate]: { selected: true, marked: true, selectedColor: '#e6b800' },
                    }}
                    theme={{
                      backgroundColor: '#23232e',
                      calendarBackground: '#23232e',
                      textSectionTitleColor: '#cdb6c1',
                      selectedDayBackgroundColor: '#e6b800',
                      selectedDayTextColor: '#23232e',
                      todayTextColor: '#e6b800',
                      dayTextColor: '#fff',
                      textDisabledColor: '#424242',
                      dotColor: '#e6b800',
                      selectedDotColor: '#23232e',
                      arrowColor: '#e6b800',
                      monthTextColor: '#fff',
                      textDayHeaderFontColor: '#fff',
                    }}
                  />
                </View>
              )}
              <View style={styles.selectedItemsContainer}>
                {selectedDate ? (
                  <Text style={styles.selectedText}>Selected Date: {selectedDate}</Text>
                ) : (
                  <Text style={styles.placeholderText}>Selected date will be displayed here</Text>
                )}
              </View>
            </View>
            <View style={styles.formGroup}>
              <TextInput style={styles.input} placeholder="Invitation Message" multiline value={invitationMessage} onChangeText={setInvitationMessage} />
            </View>
            <View style={styles.formGroup}>
              <TextInput style={styles.input} placeholder="People To Invite (e.g. name and name@gmail.com, name2 and name2@gmail.com)" multiline value={peopleToInvite} onChangeText={setPeopleToInvite} />
            </View>
            <View style={styles.formButton}>
              <TouchableOpacity style={styles.navigateButton} onPress={() => navigation.navigate('Package')}>
                <Text style={styles.navigateButtonText}>Find packages, choose and/or customize</Text>
              </TouchableOpacity>
              <View style={styles.selectedItemsContainer}>
                <Text style={styles.selectedText}>Package</Text>
                {selectedPackage && (
                  <View style={styles.selectedItemsContainer}>
                    <Image source={selectedPackage} style={styles.selectedImage} />
                  </View>
                )}
                <View style={styles.container}>
                  <View style={styles.selectedItemsContainer}>
                    {selectedPackage && selectedPackage.length > 0 && selectedPackage.map((service, index) => (
                      <View key={index} style={styles.serviceItem}>
                        <Image source={service.image} style={styles.serviceImage} />
                        <View style={styles.serviceS}>
                          <Text style={styles.serviceName}>{service.name}</Text>
                          <Text style={styles.serviceType}>{service.type}</Text>
                          <Text style={styles.servicePrice}>{service.price}k</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.formButton}>
              <TouchableOpacity style={styles.navigateButton} onPress={navigateToVenue}>
                <Text style={styles.navigateButtonText}>Find venue and choose</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.selectedItemsContainer}>
              <Text style={styles.selectedText}>Venue</Text>
              {selectedVenueLocation && (
                <Image source={selectedVenueLocation} style={styles.selectedImage} />
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
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  keyboardAvoidingView: {
    flex: 1,
    marginHorizontal: width * 0.05,
  },
  scrollView: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    color: '#e6b800',
    fontSize: width * 0.06,
    fontWeight: 'bold',
  },
  headerEType: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  eventTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e6b800',
    marginHorizontal: 3,
  },
  eventTypeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedEventTypeButton: {
    backgroundColor: '#e6b800',
  },
  eventTypeText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
  formGroup: {
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    fontSize: width * 0.04,
  },
  calendarButton: {
    backgroundColor: '#C2B067',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calendarButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
  selectedItemsContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedText: {
    color: 'black',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  placeholderText: {
    color: 'gray',
    fontSize: width * 0.04,
    fontStyle: 'italic',
  },
  formButton: {
    marginBottom: 5,
    marginTop: 15,
  },
  navigateButton: {
    backgroundColor: '#C2B067',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  navigateButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
  bookButton: {
    backgroundColor: '#e6b800',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 40,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceS: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  serviceImage: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  serviceName: {
    fontSize: width * 0.04,
    marginLeft: 10,
  },
  serviceType: {
    fontSize: width * 0.035,
    marginLeft: 10,
  },
  servicePrice: {
    fontSize: width * 0.035,
    marginLeft: 10,
    color: '#000',
  },
});

export default Book;
