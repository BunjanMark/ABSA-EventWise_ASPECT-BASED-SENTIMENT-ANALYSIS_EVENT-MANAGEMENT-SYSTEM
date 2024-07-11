import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ImageBackground } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-root-toast";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import Header from "../elements/Header";

const Book = () => {
  const [eventType, setEventType] = useState('');
  const [budget, setBudget] = useState([50000, 1000000]);
  const [sliderValues, setSliderValues] = useState(budget);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [venueLocation, setVenueLocation] = useState('');
  const [invitationMessage, setInvitationMessage] = useState('');
  const [peopleToInvite, setPeopleToInvite] = useState('');
  const navigation = useNavigation();

  const saveEvent = async () => {
    if (!eventName || !eventType || !selectedDate || !description || !venueLocation || !invitationMessage || !peopleToInvite) {
      showToast('Please fill in all the details.');
      return;
    }
    
    const bookedEvent = {
      eventType,
      eventName,
      eventDate: selectedDate,
      eventLocation: venueLocation,
      description,
      budget,
      invitationMessage,
      peopleToInvite,
    };

    try {
      // Generate a unique key for each event (e.g., using a timestamp)
      const key = `@booked_events:${Date.now()}`;
      await AsyncStorage.setItem(key, JSON.stringify(bookedEvent));
      showToast('Event booked successfully!');
      clearForm(); // Optionally clear the form after booking
    } catch (e) {
      console.error('Error saving event:', e);
      showToast('Failed to save event.');
    }
  };

  const clearForm = () => {
    setEventType('');
    setBudget([50000, 1000000]);
    setSliderValues([50000, 1000000]);
    setSelectedDate(null);
    setEventName('');
    setDescription('');
    setVenueLocation('');
    setInvitationMessage('');
    setPeopleToInvite('');
  };

  const showToast = (message = "Something went wrong") => {
    Toast.show(message, 3000);
  };

  const formatNumber = (number) => {
    if (typeof number === 'number') {
      return number.toLocaleString();
    }
    return "";
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.dateString);
    setIsCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleSliderValueChange = (values) => {
    setSliderValues(values);
    setBudget(values); 
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../pictures/bg.png")}
      >
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
            <ScrollView horizontal contentContainerStyle={styles.eventTypeButtonContainer}>
              <TouchableOpacity style={[styles.eventTypeButton, eventType === 'Wedding' && styles.selectedEventTypeButton]} onPress={() => setEventType('Wedding')}>
                <Text style={styles.eventTypeText}>Wedding</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.eventTypeButton, eventType === 'Birthday' && styles.selectedEventTypeButton]} onPress={() => setEventType('Birthday')}>
                <Text style={styles.eventTypeText}>Birthday</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.eventTypeButton, eventType === 'Reunion' && styles.selectedEventTypeButton]} onPress={() => setEventType('Reunion')}>
                <Text style={styles.eventTypeText}>Reunion</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.eventTypeButton, eventType === 'Debut' && styles.selectedEventTypeButton]} onPress={() => setEventType('Debut')}>
                <Text style={styles.eventTypeText}>Debut</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.eventTypeButton, eventType === 'KidsParty' && styles.selectedEventTypeButton]} onPress={() => setEventType('KidsParty')}>
                <Text style={styles.eventTypeText}>Kid's Party</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.eventTypeButton, eventType === 'Valentines' && styles.selectedEventTypeButton]} onPress={() => setEventType('Valentines')}>
                <Text style={styles.eventTypeText}>Valentines</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.eventTypeButton, eventType === 'Christmas' && styles.selectedEventTypeButton]} onPress={() => setEventType('Christmas')}>
                <Text style={styles.eventTypeText}>Christmas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.eventTypeButton, eventType === 'Alumni' && styles.selectedEventTypeButton]} onPress={() => setEventType('Alumni')}>
                <Text style={styles.eventTypeText}>Alumni</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.eventTypeButton, eventType === 'Party' && styles.selectedEventTypeButton]} onPress={() => setEventType('Party')}>
                <Text style={styles.eventTypeText}>Party</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={styles.formGroup}>
            <TextInput 
              style={styles.input} 
              placeholder="Type your event name" 
              value={eventName}
              onChangeText={setEventName}
            />
          </View>
          <View style={styles.formGroup}>
            <TextInput 
              style={styles.input} 
              placeholder="Type youe event description..." 
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View style={styles.formGroup}>
            <TouchableOpacity style={styles.calendarButton} onPress={toggleCalendar}>
              <Text style={styles.calendarButtonText}>Choose your event date </Text>
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
                  }}
                />
              </View>
            )}
            {selectedDate && (
              <View style={styles.formGroup}>
                <Text style={{ color: "white", marginTop: 10, alignSelf: "center",     fontSize: 16,}}>SELECTED DATE:</Text>
                <Text style={{ color: 'white', marginTop: 10, alignSelf: "center", backgroundColor: "gray", padding: 8, fontSize: 20, fontWeight: "bold" }}>{selectedDate}</Text>
              </View>
            )}
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
              placeholder="People To Invite (e.g. name and name@gmail.com, name2 and name2@gmail.com)" 
              multiline
              value={peopleToInvite}
              onChangeText={setPeopleToInvite}
            />
          </View>
          <View style={styles.formGroup}>
            <TextInput 
              style={styles.input} 
              placeholder="Package" 
              multiline
              value={venueLocation}
              onChangeText={setVenueLocation}
            />
          </View>
          <View style={styles.formGroup}>
            <TextInput 
              style={styles.input} 
              placeholder="Venue Location" 
              multiline
              value={venueLocation}
              onChangeText={setVenueLocation}
            />
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
  eventCreationPage: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 10,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 10,
  },
  goBackButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigateButton: {
    backgroundColor: '#e6b800',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 8,
  },
  headerText: {
    color: '#e6b800',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerEType: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 5
  },
  eventTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft: -8,
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
    paddingHorizontal: 16,
  },
  selectedEventTypeButton: {
    backgroundColor: '#e6b800',
  },
  eventTypeText: {
    color: '#fff',
    fontSize: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  calendarButton: {
    backgroundColor: '#e6b800',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 2,
  },
  calendarButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  budgetText: {
    color: '#fff',
    fontSize: 16,
    alignItems: 'center',
  },
  budgetContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  budgetPrices: {
    alignItems: 'center',
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  budgetPrice: {
    color: 'white',
    marginHorizontal: 8,
    fontSize: 16,
    alignItems: 'center',
  },
  budgetArrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  bookButton: {
    backgroundColor: '#e6b800',
    alignItems: 'center',
    marginBottom: 200,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    borderRadius: 20,
    margin: 100,
    marginTop: 10,
    position: "relative",
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Book;
